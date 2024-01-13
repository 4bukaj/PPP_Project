import React from "react";
import "./ExpenceCategoryItem.css";
import Box from "@mui/material/Box";

export default function ExpenceCategoryItem(props) {
  return (
    <div className="radio-container">
      <input
        type="radio"
        id={props.id}
        name="category"
        value={props.id}
        onChange={() => props.setEnteredCategory(props.id)}
      />
      <label htmlFor={props.id}>
        <Box className="radio-label" sx={{backgroundColor: props.color, opacity: 0.6}}>
          <span className="radio__category-icon">{props.icon}</span>
          <span>{props.title}</span>
        </Box>
      </label>
    </div>
  );
}
