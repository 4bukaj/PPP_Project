import "./ExpenceCategory.css";
import { categoriesList } from "./utils";
import { Box } from "@mui/material";

export default function ExpenceCategory(props) {
  return (
    <Box
      className="category-container"
      sx={{ backgroundColor: categoriesList[props.category].color }}
    >
      <div className="category-icon">{categoriesList[props.category].icon}</div>
      <div className="category-title">
        {categoriesList[props.category].title}
      </div>
    </Box>
  );
}
