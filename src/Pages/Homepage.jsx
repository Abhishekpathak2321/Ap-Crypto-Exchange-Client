import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from "../stylesheets/home.module.css"
import { useNavigate } from 'react-router-dom'

// Live prices for the scrolling ticker come from CoinGecko.
const TICKER_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=15&page=1"

// Turn one coin's market data into a tidy ticker item.
const buildTickerItem = (coin) => {
  const change = coin.price_change_percentage_24h || 0
  return {
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price.toLocaleString("en-US"),
    change: Math.abs(change).toFixed(1),
    isUp: change >= 0,
  }
}

const features = [
  { icon: "🚀", title: "Why AP Exchange?", desc: "Built for traders who demand speed, reliability, and precision. Whether your first trade or managing a full portfolio — AP Exchange handles it all seamlessly." },
  { icon: "⚡", title: "Lightning Performance", desc: "Trades executed instantly even during peak volatility. Real-time price feeds and advanced charting with zero lag." },
  { icon: "🛡️", title: "Bank-Grade Security", desc: "Industry-standard encryption, JWT-based auth, and continuous threat monitoring. Your assets and data are always protected." },
  { icon: "🎨", title: "Intuitive Design", desc: "A clean, modern interface that works across every device. No clutter — just the tools you need, right when you need them." },
]

const steps = [
  { num: "01", title: "Create Your Account", desc: "Sign up in under 60 seconds. No paperwork, no hassle — just your email and a secure password." },
  { num: "02", title: "Explore the Market", desc: "Browse 50+ live crypto prices on the Dashboard. Search, filter, and track the coins you care about." },
  { num: "03", title: "Analyse & Trade", desc: "Use the live TradingView chart to time your moves. Zoom into any timeframe — from 1 minute to months." },
]

const stats = [
  { value: "50+", label: "Cryptocurrencies" },
  { value: "24/7", label: "Market Access" },
  { value: "Real-Time", label: "Price Updates" },
  { value: "Secure", label: "JWT Auth" },
]

// Coins shown in the "Popular Assets" grid. Each carries its
// TradingView symbol so clicking it opens that coin's chart.
const popularCoins = [
  { sym: "BTC", name: "Bitcoin",  color: "#f7931a", symbol: "BINANCE:BTCUSDT" },
  { sym: "ETH", name: "Ethereum", color: "#627eea", symbol: "BINANCE:ETHUSDT" },
  { sym: "BNB", name: "BNB",      color: "#f3ba2f", symbol: "BINANCE:BNBUSDT" },
  { sym: "SOL", name: "Solana",   color: "#9945ff", symbol: "BINANCE:SOLUSDT" },
  { sym: "XRP", name: "XRP",      color: "#00aae4", symbol: "BINANCE:XRPUSDT" },
  { sym: "ADA", name: "Cardano",  color: "#0033ad", symbol: "BINANCE:ADAUSDT" },
]

const Homepage = () => {
  const navigate = useNavigate()

  // Live ticker items. Starts empty and fills in once prices load.
  const [tickerItems, setTickerItems] = useState([])

  // Fetch live prices on load, then refresh every 60 seconds.
  useEffect(() => {
    let active = true

    const fetchTicker = async () => {
      try {
        const res = await axios.get(TICKER_URL)
        if (active) setTickerItems(res.data.map(buildTickerItem))
      } catch (err) {
        // Keep showing the last prices if a refresh fails.
      }
    }

    fetchTicker()
    const timer = setInterval(fetchTicker, 60000)

    return () => {
      active = false
      clearInterval(timer)
    }
  }, [])

  return (
    <div className={styles.page}>

      {/* ── Live price ticker ── */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {/* The list is duplicated so the scroll loops seamlessly */}
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              {item.symbol} ${item.price}{" "}
              <span className={item.isUp ? styles.tickerUp : styles.tickerDown}>
                {item.isUp ? "▲" : "▼"}{item.change}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <div className={styles.hero}>

        {/* Brand logo */}
        <div className={styles.globeContainer}>
          <img src="/logo/logo1.png" alt="AP Exchange logo" className={styles.logo} />
        </div>

        {/* Small eyebrow line above the main headline */}
        <span className={styles.badge}>🚀 Welcome to AP Crypto Exchange</span>

        {/* Main headline — "Like a Pro" is highlighted in gold */}
        <h1 className={styles.title}>
          Trade Crypto <span className={styles.titleAccent}>Like a Pro</span>
        </h1>

        {/* One clear supporting sentence */}
        <p className={styles.subtitle}>
          Buy, sell and track Bitcoin, Ethereum and 100+ cryptocurrencies in real time.
          Secure, fast and powerful — everything you need in one place.
        </p>

        {/* Primary and secondary calls to action */}
        <div className={styles.heroButtons}>
          <button className={styles.btn} onClick={() => navigate("/register")}>
            Get Started
          </button>
          <button className={styles.btnOutline} onClick={() => navigate("/dashboard")}>
            View Dashboard
          </button>
        </div>

      </div>

      {/* ── Stats bar ── */}
      <div className={styles.statsBar}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statItem}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Feature cards ── */}
      <div className={styles.section1}>
        <h2 className={styles.sectionTitle}>Why Choose AP Exchange?</h2>
        <div className={styles.cardGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <div className={styles.howSection}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <span className={styles.stepNum}>{s.num}</span>
              <h4 className={styles.stepTitle}>{s.title}</h4>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Supported coins banner ── */}
      <div className={styles.coinsSection}>
        <h2 className={styles.sectionTitle}>Popular Assets</h2>
        <div className={styles.coinsGrid}>
          {popularCoins.map((c, i) => (
            <button
              key={i}
              className={styles.coinBadge}
              style={{ borderColor: c.color + "44" }}
              onClick={() => navigate(`/chart?symbol=${c.symbol}`)}
              title={`View ${c.name} chart`}
            >
              <span className={styles.coinSym} style={{ color: c.color }}>{c.sym}</span>
              <span className={styles.coinName}>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to Start Trading?</h2>
        <p className={styles.ctaDesc}>Join AP Exchange today and take control of your crypto journey.</p>
        <div className={styles.ctaBtns}>
          <button className={styles.btn} onClick={() => navigate("/register")}>Create Free Account</button>
          <button className={styles.btnOutline} onClick={() => navigate("/dashboard")}>View Dashboard</button>
        </div>
      </div>

    </div>
  )
}

export default Homepage
