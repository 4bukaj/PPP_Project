import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import "./AddNewExpenceForm.css";
import { categoriesList } from "../Expences/ExpencesCategories.js";
import ExpenceCategoryItem from "./ExpenceCategoryItem";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

//SCROLLING DOWN FUNCTION
let isDown = false;
let startX;
let scrollLeft;

const mouseDown = (e) => {
  isDown = true;
  const slider = document.getElementById("modal-form__category");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};

const mouseLeave = () => {
  isDown = false;
};

const mouseUp = () => {
  isDown = false;
};

const mouseMove = (e) => {
  if (!isDown) return;
  e.preventDefault();
  const slider = document.getElementById("modal-form__category");
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
};

const today = new Date().toISOString().split("T")[0];

export default function ModalForm(props) {
  const transactionsCollectionRef = collection(db, "transactions");
  const { currentUser } = useAuth();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState(today);
  const [enteredCategory, setEnteredCategory] = useState("");

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
  };

  const handleAmountChange = (event) => {
    setEnteredAmount(event.target.value);
  };

  const handleDateChange = (event) => {
    setEnteredDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const now = new Date();
    const secs = now.getSeconds();
    const mins = now.getMinutes() * 60;
    const hours = now.getHours() * 3600;
    const passDate = new Date(
      (new Date(enteredDate).getTime() / 1000 + hours + mins + secs) * 1000
    );

    console.log(passDate);

    await addDoc(transactionsCollectionRef, {
      userID: currentUser.uid,
      title: enteredTitle,
      amount: enteredAmount,
      date: passDate,
      category: enteredCategory,
    });
    props.onClose();
  };

  //RENDER CATEGORIES BOXES
  const renderCategories = categoriesList.map((category) => (
    <ExpenceCategoryItem
      id={category.id}
      key={category.id}
      title={category.title}
      icon={category.icon}
      color={category.color}
      setEnteredCategory={setEnteredCategory}
    />
  ));

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="modal-form__controls">
        <TextField
          required
          name="title"
          label="Title"
          variant="outlined"
          type={"text"}
          value={enteredTitle}
          onChange={handleTitleChange}
          InputLabelProps={{ className: "textfield__label-modal" }}
        />
        <TextField
          required
          name="amount"
          label="Amount"
          variant="outlined"
          type={"number"}
          value={enteredAmount}
          onChange={handleAmountChange}
          InputLabelProps={{ className: "textfield__label-modal" }}
        />
        <TextField
          required
          name="date"
          label="Date"
          variant="outlined"
          type={"date"}
          value={enteredDate}
          onChange={handleDateChange}
          InputLabelProps={{ className: "textfield__label-modal" }}
        />
      </div>
      <div
        className="modal-form__category"
        id="modal-form__category"
        onMouseDown={mouseDown}
        onMouseLeave={mouseLeave}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      >
        {renderCategories}
      </div>
      <div className="modal-form__buttons">
        <button
          type="submit"
          className="dark-btn"
          onClick={() => props.onTransactionAdd()}
          disabled={
            !enteredTitle ||
            !enteredAmount ||
            !enteredCategory ||
            (!enteredDate && true)
          }
        >
          Add
        </button>
      </div>
    </form>
  );
}
