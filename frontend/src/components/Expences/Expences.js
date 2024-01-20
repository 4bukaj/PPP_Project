import React, { useState, useEffect, useContext } from "react";
import "./Expences.css";
import ExpenceItem from "./ExpenceItem";
import AddNewExpence from "../AddNewExpence/AddNewExpence";
import ExpencesFilterType from "./ExpencesFilterType";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ExpensesContext } from "../../contexts/ExpensesContext";

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
  const { filteredExpenses } = useContext(ExpensesContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="expences-container">
      <AddNewExpence
        open={isOpen}
        onClose={() => setIsOpen(false)}
        addNewExpence
      ></AddNewExpence>
      <div className="expences-container__controls">
        <div className="new-expence__container" onClick={() => setIsOpen(true)}>
          <div className="new-expence__icon">
            <AddBoxIcon />
          </div>
          <div className="new-expence__title">Add new</div>
        </div>
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
          <span className="transactions-error">
            No matching transactions found
          </span>
        )}
      </div>
    </div>
  );
}
