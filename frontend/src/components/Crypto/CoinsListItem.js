import React from "react";
import "./CoinsListItem.css";

export default function CoinsListItem({ coin, value, amount, image, date }) {
  const secs = date.seconds;
  const transactionDate = new Date(secs * 1000);

  const month = transactionDate.toLocaleString("en-US", { month: "2-digit" });
  const day = transactionDate.toLocaleString("en-US", { day: "2-digit" });
  const year = transactionDate.getFullYear();
  const fullDate = day + "/" + month + "/" + year;

  return (
    <div className="coins-list-item">
      <div className="coin-holder">
        <img src={image} alt={coin} />
        &nbsp;
        <span className="bold">{coin}</span>
      </div>
      <div>{amount}</div>
      <div>{value + " zł"}</div>
      <div>{fullDate}</div>
    </div>
  );
}
