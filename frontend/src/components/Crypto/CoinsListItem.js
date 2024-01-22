import React from "react";
import "./CoinsListItem.css";
import { format } from "date-fns";

export default function CoinsListItem({
  coin,
  value,
  amount,
  image,
  createdAt,
}) {
  return (
    <div className="coins-list-item">
      <div className="coin-holder">
        <img src={image} alt={coin} />
        <span className="bold">{coin}</span>
      </div>
      <div>{amount}</div>
      <div>{`${parseFloat(value).toFixed(2)} zł`}</div>
      <div>{format(new Date(createdAt), "dd LLL yyyy")}</div>
    </div>
  );
}
