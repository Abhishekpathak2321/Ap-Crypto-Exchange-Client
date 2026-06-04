// Branded greeting printed to the browser DevTools console.
// Purely cosmetic — shows a colourful AP Exchange logo + a friendly welcome,
// plus a small security note (the classic "self-XSS" warning).

const printConsoleBanner = () => {
    // ASCII logo for "AP" rendered with a gold gradient background.
    const logo = `
   █████╗ ██████╗     ███████╗██╗  ██╗ ██████╗██╗  ██╗ █████╗ ███╗   ██╗ ██████╗ ███████╗
  ██╔══██╗██╔══██╗    ██╔════╝╚██╗██╔╝██╔════╝██║  ██║██╔══██╗████╗  ██║██╔════╝ ██╔════╝
  ███████║██████╔╝    █████╗   ╚███╔╝ ██║     ███████║███████║██╔██╗ ██║██║  ███╗█████╗
  ██╔══██║██╔═══╝     ██╔══╝   ██╔██╗ ██║     ██╔══██║██╔══██║██║╚██╗██║██║   ██║██╔══╝
  ██║  ██║██║         ███████╗██╔╝ ██╗╚██████╗██║  ██║██║  ██║██║ ╚████║╚██████╔╝███████╗
  ╚═╝  ╚═╝╚═╝         ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
`

    // Gold ASCII logo
    console.log(`%c${logo}`, 'color: #FFD700; font-weight: bold; text-shadow: 0 0 6px rgba(255,215,0,0.4);')

    // Big welcome line with a gold "pill" background
    console.log(
        '%c ⚡ Welcome to AP Exchange ',
        'background: linear-gradient(90deg, #FFD700, #ffb700); color: #0f1620; font-size: 20px; font-weight: 800; padding: 8px 18px; border-radius: 8px; letter-spacing: 0.5px;'
    )

    // Tagline
    console.log(
        '%cTrade · Track · Grow 🚀  —  Real-time prices, live charts & secure trading.',
        'color: #FFD700; font-size: 13px; font-weight: 600; padding: 6px 0;'
    )

    // Friendly security note (self-XSS protection)
    console.log(
        '%c⚠ Stop!',
        'color: #ff5252; font-size: 22px; font-weight: 800;'
    )
    console.log(
        "%cThis console is for developers. If someone told you to paste something here to 'unlock a feature' or 'hack' an account, it's a scam and could give them access to your AP Exchange account. Never paste code you don't understand.",
        'color: rgba(255,255,255,0.7); font-size: 13px; line-height: 1.6;'
    )

    // Fun footer
    console.log(
        '%cBuilt with ❤️ by Abhishek Pathak',
        'color: rgba(255,255,255,0.4); font-size: 12px; font-style: italic;'
    )
}

export default printConsoleBanner
