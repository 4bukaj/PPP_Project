import React from "react";
import { format } from "date-fns";

export default function ExpenceDate(props) {
  const date = format(new Date(props.date), "EEEE, dd LLL yyyy");

  return (
    <div className="expence-date">
      <div className="expence-date__date">{date}</div>
    </div>
  );
}
