
import { useEffect, useRef } from "react";

const ChartPage = ({ symbol = "BINANCE:BTCUSDT",}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          symbol: symbol,
          interval: "1",
          container_id: chartRef.current.id,
          width: "100%",
          height: 500,
          theme: "dark",
          timezone: "Asia/Kolkata",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // cleanup (important in React)
      if (chartRef.current) chartRef.current.innerHTML = "";
    };
  }, [symbol]);

  return <div id="tradingview_chart" ref={chartRef}></div>;
};

export default ChartPage;