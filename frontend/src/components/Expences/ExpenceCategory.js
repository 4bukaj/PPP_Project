import React, { useState } from "react";
import "./ExpenceCategory.css";
import { categoriesList } from "./utils";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExpenceCategory(props) {
  const [deleteButton, setDeleteButton] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);

  const handleDeleteTransaction = async () => {
    props.onTransactionRemove();
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
