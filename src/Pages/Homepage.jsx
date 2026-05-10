import React from 'react'
import styles from "../stylesheets/home.module.css"
import { useNavigate } from 'react-router-dom'

const ticker = [
  "BTC $67,234 ▲2.4%", "ETH $3,421 ▲1.8%", "BNB $582 ▼0.6%",
  "SOL $189 ▲4.1%", "ADA $0.61 ▲0.9%", "DOGE $0.18 ▼1.2%",
  "XRP $0.72 ▲0.5%", "DOT $9.45 ▼0.3%", "AVAX $43.2 ▲3.7%",
  "MATIC $0.98 ▲1.1%", "LINK $18.4 ▲2.6%", "LTC $94.2 ▼0.4%",
]

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

const Homepage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>

      {/* ── Ticker ── */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className={styles.tickerItem}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.globeContainer}>
          <img src="/logo/logo1.png" alt="logo" className={styles.logo} />
        </div>
        <h1>Welcome To Ap Crypto Exchange</h1>
        <h2 className={styles.heading}>Trade Crypto Like a Pro</h2>
        <div className={styles.content}>
          <p>Buy, Sell and Track Bitcoin, Ethereum and 100+ cryptocurrencies in real time.</p>
          <p>Secure. Fast. Powerful.</p>
          <button className={styles.btn} onClick={() => navigate("/register")}>Get Started</button>
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
          {[
            { sym: "BTC", name: "Bitcoin",  color: "#f7931a" },
            { sym: "ETH", name: "Ethereum", color: "#627eea" },
            { sym: "BNB", name: "BNB",      color: "#f3ba2f" },
            { sym: "SOL", name: "Solana",   color: "#9945ff" },
            { sym: "XRP", name: "XRP",      color: "#00aae4" },
            { sym: "ADA", name: "Cardano",  color: "#0033ad" },
          ].map((c, i) => (
            <div key={i} className={styles.coinBadge} style={{ borderColor: c.color + "44" }}>
              <span className={styles.coinSym} style={{ color: c.color }}>{c.sym}</span>
              <span className={styles.coinName}>{c.name}</span>
            </div>
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
