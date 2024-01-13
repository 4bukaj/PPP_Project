import React, { useState } from "react";
import "./ExpenceCategory.css";
import { categoryCheck } from "./ExpencesCategories";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

export default function ExpenceCategory(props) {
  const [deleteButton, setDeleteButton] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);

  const handleDeleteTransaction = async () => {
    const expenceDoc = doc(db, "transactions", props.expenceID);
    await deleteDoc(expenceDoc);
    props.onTransactionRemove();
  };

  const bgColor = () => {
    let color = 0;
    if (removeConfirm) color = "#CF0A0A";
    else color = categoryCheck(props.category).color;
    return color;
  };

  const onMouseOver = () => {
    setDelayHandler(setTimeout(() => {
      setDeleteButton(true);
      setRemoveConfirm(true);
  }, 1500))
      
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
        {deleteButton ? <DeleteIcon /> : categoryCheck(props.category).icon}
      </div>
      <div className="category-title">
        {deleteButton ? (
          <span>Remove?</span>
        ) : (
          categoryCheck(props.category).title
        )}
      </div>
    </Box>
  );
}
