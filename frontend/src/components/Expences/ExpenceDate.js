import React from "react";

export default function ExpenceDate(props) {
    
  const secs = props.date.seconds;
  const transactionDate = new Date(secs * 1000);

  const month = transactionDate.toLocaleString("en-US", { month: "long" });
  const day = transactionDate.toLocaleString("en-US", { day: "2-digit" });
  const year = transactionDate.getFullYear();

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weekday = weekdays[transactionDate.getDay()];
  const date = weekday + ' | ' + day + " " + month + " " + year; 

  return (
    <div className="expence-date">
      <div className="expence-date__date">{date}</div>
    </div>
  );
}
