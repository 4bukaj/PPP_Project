import React, { useState, useEffect, useContext } from "react";
import ExpenceDate from "./ExpenceDate";
import "./ExpenceItem.css";
import ExpenceCategory from "./ExpenceCategory";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import { fetchExpenses } from "../../utils";

export default function ExpenceRow(props) {
  const { session, setExpenses, setPopupOpen, setEditedExpense } =
    useContext(ExpensesContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = async () => {
    axios
      .delete(`http://127.0.0.1:8000/expenses/delete/${props.expenceID}/`)
      .then(async (response) => {
        const data = await fetchExpenses(session.id);
        setExpenses(data);
      })
      .catch((e) => console.log(e));
  };

  const handleEditClick = () => {
    setAnchorEl(null);
    setEditedExpense({
      id: props.expenceID,
      title: props.title,
      amount: props.amount,
      date: props.date,
      category: props.category,
    });
    setPopupOpen(true);
  };

  return (
    <div className="expence-item">
      <ExpenceCategory category={props.category} expenceID={props.expenceID} />
      <div className="expence-item__row">
        <div className="expence-item__col">
          <div className="expence-item__title">{props.title}</div>
          <ExpenceDate date={props.date} />
        </div>
        <div className="expence-item__amount">{props.amount} zł</div>
        <div className="expence-item__options">
          <IconButton>
            <MoreVertIcon onClick={handleClick} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              ".MuiPaper-root": {
                width: "120px",
                ul: { color: "primary.main", textTransform: "uppercase" },
              },
            }}
          >
            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
