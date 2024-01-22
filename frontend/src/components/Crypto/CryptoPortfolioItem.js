import React from "react";
import "./CryptoPortfolioItem.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function CryptoPortfolioItem({
  coin,
  amount,
  value,
  image,
  avgRate,
  pnl,
}) {
  const color = pnl < 0 ? "red" : "rgb(14,203,129)";
  const style = {
    color: color,
  };

  return (
    <div className="coins-list-item righty">
      <div className="coin-holder">
        <img src={image} alt={coin} />
        &nbsp;
        <span className="bold">{coin}</span>
      </div>
      <div>{value + " zł"}</div>
      <div>{avgRate.toFixed(2) + " zł"}</div>
      <div>
        <span>
          <span className="colored" style={style}>
            {pnl.toFixed(2) > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            {pnl.toFixed(2) + "%"}
          </span>
        </span>
      </div>
    </div>
  );
}
