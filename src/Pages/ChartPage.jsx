import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../stylesheets/Chart.module.css";

// Coins shown as quick-switch buttons above the chart.
// Each one maps a short label to its TradingView trading pair.
const COINS = [
  { label: "BTC", name: "Bitcoin",  symbol: "BINANCE:BTCUSDT" },
  { label: "ETH", name: "Ethereum", symbol: "BINANCE:ETHUSDT" },
  { label: "BNB", name: "BNB",      symbol: "BINANCE:BNBUSDT" },
  { label: "SOL", name: "Solana",   symbol: "BINANCE:SOLUSDT" },
  { label: "XRP", name: "XRP",      symbol: "BINANCE:XRPUSDT" },
  { label: "ADA", name: "Cardano",  symbol: "BINANCE:ADAUSDT" },
]

// Turn a TradingView symbol ("BINANCE:BTCUSDT") into the lowercase
// pair Binance's WebSocket expects ("btcusdt").
const toBinancePair = (symbol) =>
  (symbol.includes(":") ? symbol.split(":")[1] : symbol).toLowerCase()

// Price as USD. Small-priced coins (like ADA) get more decimals.
const formatPrice = (value) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 1 ? 4 : 2,
  })

// Big volume numbers shown compactly, e.g. $1.2B.
const formatVolume = (value) =>
  "$" + value.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 })


/* ──────────────────────────────────────────────
   A small reusable loader for TradingView's official
   "embed" widgets (symbol info, technical analysis…).
   Each widget is just a script tag whose body is a
   JSON config — we re-create it whenever the config
   changes (e.g. the user switches coins).
   ────────────────────────────────────────────── */
const TradingViewEmbed = ({ scriptSrc, config }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // The widget renders itself into this inner div.
    container.innerHTML = '<div class="tradingview-widget-container__widget"></div>'

    const script = document.createElement("script")
    script.src = scriptSrc
    script.async = true
    script.innerHTML = JSON.stringify(config)
    container.appendChild(script)

    return () => {
      container.innerHTML = ""
    }
    // Re-run when the symbol (or any config value) changes.
  }, [scriptSrc, JSON.stringify(config)])

  return <div className="tradingview-widget-container" ref={containerRef}></div>
}


const ChartPage = ({ symbol = "BINANCE:BTCUSDT" }) => {
  const chartRef = useRef(null)

  // The chart page can be opened with a coin already chosen,
  // e.g. /chart?symbol=BINANCE:ETHUSDT from the homepage.
  const [searchParams, setSearchParams] = useSearchParams()
  const symbolFromUrl = searchParams.get("symbol")

  // Which trading pair is currently shown.
  const [activeSymbol, setActiveSymbol] = useState(symbolFromUrl || symbol)

  // Live 24h stats streamed from Binance, plus the direction of the
  // last price tick ("up" / "down") so we can flash the price.
  const [live, setLive] = useState(null)
  const [tickDir, setTickDir] = useState("")
  const lastPriceRef = useRef(null)

  // Open a real-time WebSocket to Binance for the selected pair.
  // Public market data needs no API key — it streams straight to the browser.
  useEffect(() => {
    const pair = toBinancePair(activeSymbol)

    // Reset stats while the new stream connects.
    setLive(null)
    setTickDir("")
    lastPriceRef.current = null

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@ticker`)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const price = parseFloat(data.c)

      // Flash green/red depending on whether the price ticked up or down.
      if (lastPriceRef.current !== null) {
        if (price > lastPriceRef.current) setTickDir("up")
        else if (price < lastPriceRef.current) setTickDir("down")
      }
      lastPriceRef.current = price

      setLive({
        price,
        changePercent: parseFloat(data.P),
        high: parseFloat(data.h),
        low: parseFloat(data.l),
        volume: parseFloat(data.q), // quote volume, in USDT
      })
    }

    // Close the socket when the coin changes or the page unmounts.
    return () => ws.close()
  }, [activeSymbol])

  // If the URL symbol changes (e.g. arriving from another page), follow it.
  useEffect(() => {
    if (symbolFromUrl && symbolFromUrl !== activeSymbol) {
      setActiveSymbol(symbolFromUrl)
    }
  }, [symbolFromUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  // Clicking a coin button updates both the chart and the URL,
  // so the link stays shareable.
  const selectCoin = (coinSymbol) => {
    setActiveSymbol(coinSymbol)
    setSearchParams({ symbol: coinSymbol })
  }

  // Build the main TradingView advanced chart.
  useEffect(() => {
    const container = chartRef.current

    const renderChart = () => {
      if (!window.TradingView || !container) return

      // Clear any previous chart before drawing the new one.
      container.innerHTML = ""

      new window.TradingView.widget({
        symbol: activeSymbol,
        interval: "1",
        container_id: container.id,
        autosize: true,          // fill the container instead of a fixed height
        theme: "dark",
        timezone: "Asia/Kolkata",
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
      })
    }

    // Load the TradingView script only once, then reuse it on later switches.
    if (window.TradingView) {
      renderChart()
    } else {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = renderChart
      document.body.appendChild(script)
    }

    return () => {
      if (container) container.innerHTML = ""
    }
  }, [activeSymbol])

  // The human-friendly name of the coin currently being shown.
  const activeCoin = COINS.find((c) => c.symbol === activeSymbol)

  return (
    <div className={styles.page}>

      {/* ── Toolbar: title + quick coin switcher ── */}
      <div className={styles.toolbar}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Live Market Chart</h1>
          <p className={styles.subtitle}>Real-time prices streamed live from Binance</p>
        </div>

        <div className={styles.coinSwitch}>
          {COINS.map((coin) => (
            <button
              key={coin.symbol}
              className={`${styles.coinBtn} ${activeSymbol === coin.symbol ? styles.coinBtnActive : ""}`}
              onClick={() => selectCoin(coin.symbol)}
              title={coin.name}
            >
              {coin.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Live stats bar (real-time via Binance WebSocket) ── */}
      <div className={styles.liveBar}>
        {live ? (
          <>
            <div className={styles.liveItem}>
              <span className={styles.liveLabel}>
                <span className={styles.liveDot}></span>Last Price
              </span>
              <span className={`${styles.livePrice} ${tickDir === "up" ? styles.up : tickDir === "down" ? styles.down : ""}`}>
                {formatPrice(live.price)}
              </span>
            </div>
            <div className={styles.liveItem}>
              <span className={styles.liveLabel}>24h Change</span>
              <span className={live.changePercent >= 0 ? styles.up : styles.down}>
                {live.changePercent >= 0 ? "+" : ""}{live.changePercent.toFixed(2)}%
              </span>
            </div>
            <div className={styles.liveItem}>
              <span className={styles.liveLabel}>24h High</span>
              <span className={styles.liveValue}>{formatPrice(live.high)}</span>
            </div>
            <div className={styles.liveItem}>
              <span className={styles.liveLabel}>24h Low</span>
              <span className={styles.liveValue}>{formatPrice(live.low)}</span>
            </div>
            <div className={styles.liveItem}>
              <span className={styles.liveLabel}>24h Volume</span>
              <span className={styles.liveValue}>{formatVolume(live.volume)}</span>
            </div>
          </>
        ) : (
          <span className={styles.liveConnecting}>Connecting to live price feed…</span>
        )}
      </div>

      {/* ── The main chart ── */}
      <div id="tv_chart_container" ref={chartRef} className={styles.chart}></div>

      {/* ── Extra market data below the chart ──
          Symbol overview on the left, a technical-analysis
          gauge on the right — both follow the selected coin. */}
      <div className={styles.details}>
        <h2 className={styles.detailsTitle}>
          {activeCoin ? `${activeCoin.name} Overview` : "Market Overview"}
        </h2>

        <div className={styles.detailsGrid}>
          <div className={styles.detailsCard}>
            <TradingViewEmbed
              scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
              config={{
                symbol: activeSymbol,
                width: "100%",
                locale: "en",
                colorTheme: "dark",
                isTransparent: true,
              }}
            />
          </div>

          <div className={styles.detailsCard}>
            <TradingViewEmbed
              scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
              config={{
                symbol: activeSymbol,
                interval: "1m",
                width: "100%",
                height: 400,
                locale: "en",
                colorTheme: "dark",
                isTransparent: true,
                showIntervalTabs: true,
                displayMode: "single",
              }}
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ChartPage
