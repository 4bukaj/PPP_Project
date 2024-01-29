import React, { useState, useEffect, useContext } from "react";
import "./Expences.css";
import ExpenceItem from "./ExpenceItem";
import AddNewExpence from "../AddNewExpence/AddNewExpence";
import ExpencesFilterType from "./ExpencesFilterType";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import { Button } from "@mui/material";

//SCROLLING DOWN FUNCTION
let isDown = false;
let startY;
let scrollDown;

const mouseDown = (e) => {
  isDown = true;
  const slider = document.getElementById("expences-container__child");
  slider.classList.add("scrolling");
  startY = e.pageY - slider.offsetTop;
  scrollDown = slider.scrollTop;
};

const mouseLeave = () => {
  isDown = false;
  document
    .getElementById("expences-container__child")
    .classList.remove("scrolling");
};

const mouseUp = () => {
  isDown = false;
  document
    .getElementById("expences-container__child")
    .classList.remove("scrolling");
};

const mouseMove = (e) => {
  if (!isDown) return;
  e.preventDefault();
  const slider = document.getElementById("expences-container__child");
  const y = e.pageY - slider.offsetTop;
  const walk = y - startY;
  slider.scrollTop = scrollDown - walk;
};

export default function Expences(props) {
  const { filteredExpenses, setPopupOpen, filterValue } =
    useContext(ExpensesContext);

  const renderFilterLabel = () => {
    switch (filterValue) {
      case "thisMonth":
        return "this month";
      case "lastMonth":
        return "last month";
      case "thisYear":
        return "this year";
      case "lastYear":
        return "last year";
      default:
        return null;
    }
  };

  return (
    <div className="expences-container">
      <div className="expences-container__controls">
        <Button
          startIcon={<AddBoxIcon />}
          variant="contained"
          color="primary"
          onClick={() => setPopupOpen(true)}
          sx={{ height: "50px", width: "50%" }}
        >
          Add new expense
        </Button>
        <ExpencesFilterType />
      </div>
      <div
        className="expences-container__expences"
        id="expences-container__child"
        onMouseDown={mouseDown}
        onMouseLeave={mouseLeave}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      >
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((transaction) => (
            <ExpenceItem
              key={transaction.id}
              title={transaction.Title}
              amount={transaction.Amount}
              date={transaction.Date}
              category={transaction.Category}
              expenceID={transaction.id}
            />
          ))
        ) : (
          <div className="transactions-error">
            <p>{`Ooopss, no expenses found in ${renderFilterLabel()}.`}</p>
            <p>
              {" "}
              Try changing your <b>filters</b>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
