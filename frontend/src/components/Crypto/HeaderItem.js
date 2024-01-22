import React from "react";
import "./HeaderItem.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function HeaderItem(props) {
  const color = props.percentage < 0 ? "red" : "rgb(14,203,129)";
  const style = {
    color: color,
  };

  return (
    <div className="header-item-container">
      <div className="header-item-top">
        {props.pnl ? (
          <>
            <span>{`${props.number} zł`}</span>
            <span>
              {!isNaN(props.percentage) && (
                <span className="colored" style={style}>
                  {props.percentage > 0 ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                  {props.percentage + "%"}
                </span>
              )}
            </span>
          </>
        ) : (
          <span>{props.number} zł</span>
        )}
      </div>
      <div className="header-item-title">{props.title}</div>
    </div>
  );
}
