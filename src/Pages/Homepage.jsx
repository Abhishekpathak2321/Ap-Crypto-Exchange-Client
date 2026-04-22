import React from 'react'
import styles from "../stylesheets/home.module.css"
import { useNavigate } from 'react-router-dom'



const Homepage = () => {
    const navigate = useNavigate()
    const handleNavigate = ()=>{
      navigate("/register")
    }
  return (
    <div>
      
      <div className={styles.hero}>
        <h1> Welcome To Ap Crypto Exchange</h1>
      <div className={styles.globeContainer}>
      <img src="/logo/logo1.png" alt="logo" className={styles.logo} />
</div>

      <h2 className={styles.heading}>Trade Crypto Like a Pro</h2>
      <div className={styles.content}>
      <p>Buy, Sell and Track Bitcoin, Ethereum and 100+ cryptocurrencies in real time.</p>
      <p>Secure. Fast. Powerful.</p>
      <button className ={styles.btn} onClick={handleNavigate}>Register yourself now</button>
      </div>
      </div>

      <div className={styles.section1}>

  <h2>🚀 Why AP Exchange ?</h2>
<p>AP Exchange is built for traders who demand performance, reliability, and precision in every transaction. In today’s fast-moving digital economy, where market conditions shift within seconds, having the right platform can make all the difference. Our exchange is designed to provide a seamless trading experience for both beginners and experienced traders. With a clean interface and intuitive navigation, users can easily access key features without unnecessary complexity. AP Exchange supports a wide range of cryptocurrencies, allowing users to diversify their portfolios and explore new opportunities in the market. Whether you are making your first trade or managing multiple assets, our platform ensures that every action is smooth, efficient, and responsive. We focus on simplifying the trading process while maintaining powerful functionality, so you can stay focused on making smart decisions and maximizing your growth in the crypto space.
</p>

<br />
<h4>⚡ Performance & Technology</h4>

<p>Performance is at the heart of AP Exchange. Our platform is engineered to deliver lightning-fast execution, ensuring that your trades are processed instantly, even during high market volatility. With real-time data updates and advanced charting tools, you can track market trends and price movements without delays. This allows traders to react quickly and make informed decisions based on accurate information. The system is optimized for speed and scalability, meaning it can handle high volumes of transactions without compromising performance. Whether you are trading during peak hours or analyzing market data, the experience remains smooth and uninterrupted. Our technology stack is built to support continuous improvements, ensuring that users always have access to the latest tools and enhancements. At AP Exchange, we prioritize efficiency and reliability so that you can trade with confidence and precision at any time.
</p>
<br />

<h4>🛡️ Security First</h4>
<p>Security is the foundation of AP Exchange. We understand that protecting your assets and personal information is critical, which is why we implement multiple layers of advanced security measures. Our platform uses industry-standard encryption protocols to ensure that all data is securely transmitted and stored. In addition, multi-factor authentication adds an extra layer of protection to your account, preventing unauthorized access. Our systems are continuously monitored to detect and respond to potential threats in real time. We also follow strict security practices to minimize vulnerabilities and maintain a safe trading environment. By combining technology with proactive monitoring, we create a secure ecosystem where users can focus on trading without worrying about risks. At AP Exchange, your trust is our priority, and we are committed to maintaining the highest level of security standards at all times.
</p>
<br />
<h4>🎨 User Experience</h4>

<p>At AP Exchange, we believe that a powerful platform should also be simple and easy to use. That’s why we focus heavily on delivering a smooth and intuitive user experience. The interface is designed to be clean, modern, and responsive, allowing users to navigate effortlessly across different features. Whether you are checking prices, executing trades, or managing your portfolio, every action is streamlined for convenience. The platform works seamlessly across all devices, ensuring a consistent experience whether you are using a desktop, tablet, or mobile phone. We eliminate unnecessary complexity and focus on clarity, so users can interact with the platform without confusion. Our goal is to create an environment where trading feels natural and efficient. With AP Exchange, you don’t just get powerful tools—you get an experience that makes trading easier, faster, and more enjoyable.
</p> 
      </div>

    </div>
  )
}

export default Homepage
