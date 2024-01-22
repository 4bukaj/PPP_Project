import React, { useState, useEffect } from "react";
import ExpenceDate from "./ExpenceDate";
import "./ExpenceItem.css";
import ExpenceCategory from "./ExpenceCategory";

export default function ExpenceRow(props) {
  return (
    <div className="expence-item">
      <ExpenceCategory category={props.category} expenceID={props.expenceID} />
      <div className="expence-item__row">
        <div className="expence-item__col">
          <div className="expence-item__title">{props.title}</div>
          <ExpenceDate date={props.date} />
        </div>
        <div className="expence-item__amount">{props.amount} zł</div>
      </div>
    </div>
  );
}
