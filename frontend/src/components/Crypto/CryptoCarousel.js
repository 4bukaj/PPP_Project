import React, { useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./CryptoCarousel.css";
import { mockCryptoData, mockTrendingCryptoData } from "./mockData";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CryptoCarousel() {
  const [trendingCoins, setTrendingCoins] = useState(mockTrendingCryptoData);

  // const fetchTrendingCoins = async () => {
  //   const { data } = await axios.get(TrendingCoins("PLN"));

  //   setTrendingCoins(data);
  // };

  // useEffect(() => {
  //   fetchTrendingCoins();
  // }, []);

  const items = trendingCoins.map((coin) => {
    const profit = coin.price_change_percentage_24h;
    const profitColor = profit >= 0 ? "rgb(14,203,129)" : "red";

    return (
      <div className="crypto-carousel__coin-card">
        <img src={coin?.image} alt={coin.name} />
        <span className="coin-card-title">
          {(coin?.symbol).toUpperCase()} &nbsp;
          <span className="coin-card-profit" style={{ color: profitColor }}>
            {profit > 0 && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className="coin-card-price">
          PLN {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 2,
    },
    720: {
      items: 3,
    },
    840: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  };

  return (
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
    />
  );
}
