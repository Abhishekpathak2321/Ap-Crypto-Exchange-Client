import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from "../stylesheets/dashboard.module.css"



const DashboardPage = () => {

    const [crypto, setCrypto] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const Url = ("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50")

    useEffect(() => {
        const fetchCrypto = async () => {
            try {
                const res = await axios.get(Url)
                setCrypto(res.data);
                //sometimes api crashed thats why i used this conosle
                console.log(res.data);
                setLoading(false)

            } catch (error) {
                setError(error, "Fetching Api Error");
            }
        }
        fetchCrypto()
    }, [])

    const FilterCoins = crypto.filter((coin) => {
        return coin.name.toLowerCase().includes(search.toLowerCase());
    })
    if (loading)
        return <h4 style={{ color: "orange" }}>loading Coins</h4>
    return (


        <div className={styles.box}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Coins Dashboard</h2>

                <input className={styles.input} type="text"
                    value={search}
                    placeholder='Enter the name of Coin'
                    onChange={(event) => setSearch(event.target.value)} />

                {
                    FilterCoins.map((coin, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className={styles.coinCard}>
                                    <div className={styles.coinInfo}>
                                        <img src={coin.image} alt={coin.name} width="100" />
                                        <h2 className={styles.h2}>Name:{coin.name}</h2>
                                        <p className={styles.price}>Price $: {coin.current_price}</p>

                                    </div>
                                </div>

                            </React.Fragment>
                        )

                    })
                }

                <p>{error}</p>
            </div>
        </div>
    )
}

export default DashboardPage
