import React, { useContext, useState } from "react";
import "./ExpenceCategory.css";
import { categoriesList } from "./utils";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { fetchExpenses } from "../../utils";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export default function ExpenceCategory(props) {
  const { session, setExpenses } = useContext(ExpensesContext);
  const [deleteButton, setDeleteButton] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);

  const handleDeleteTransaction = async () => {
    axios
      .delete(`http://127.0.0.1:8000/expenses/delete/${props.expenceID}/`)
      .then(async (response) => {
        const data = await fetchExpenses(session.id);
        setExpenses(data);
      })
      .catch((e) => console.log(e));
  };

  const bgColor = () => {
    return removeConfirm ? "#CF0A0A" : categoriesList[props.category].color;
  };

  const onMouseOver = () => {
    setDelayHandler(
      setTimeout(() => {
        setDeleteButton(true);
        setRemoveConfirm(true);
      }, 1500)
    );
  };

  const onMouseOut = () => {
    setDeleteButton(false);
    setRemoveConfirm(false);
    clearTimeout(delayHandler);
  };

  return (
    <Box
      onClick={handleDeleteTransaction}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOut}
      className="category-container"
      sx={{ backgroundColor: bgColor() }}
    >
      <div className="category-icon">
        {deleteButton ? <DeleteIcon /> : categoriesList[props.category].icon}
      </div>
      <div className="category-title">
        {deleteButton ? (
          <span>Remove?</span>
        ) : (
          categoriesList[props.category].title
        )}
      </div>
    </Box>
  );
}
