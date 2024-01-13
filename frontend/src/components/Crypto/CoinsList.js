import React from "react";
import { useEffect } from "react";
import "./CoinsList.css";
import CoinsListItem from "./CoinsListItem";

export default function CoinsList({ portfolioList, cryptoList }) {
  portfolioList.forEach((coin) => {
    cryptoList.forEach((item) => {
      if (item.symbol.toUpperCase() === coin.coin) coin.image = item.image;
    });
  });

  portfolioList.sort(function (a, b) {
    return b.date.seconds - a.date.seconds;
  });
  return (
    <div>
      <div className="coins-list">
        <div className="coins-list-header">
          <div>Crypto</div>
          <div>Amount</div>
          <div>Value</div>
          <div>Date</div>
        </div>
        {portfolioList.length > 0 ? (
          portfolioList.map((coin) => {
            return (
              <CoinsListItem
                key={coin.coin + coin.amount}
                coin={coin.coin}
                amount={coin.amount}
                value={coin.value}
                image={coin.image}
                date={coin.date}
              />
            );
          })
        ) : (
          <span className="transactions-error">No transactions found!</span>
        )}
      </div>
    </div>
  );
}
