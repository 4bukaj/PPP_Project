import "./ExpenceCategoryItem.css";
import Box from "@mui/material/Box";

export default function ExpenceCategoryItem(props) {
  const selectedStyles = {
    opacity: 1,
    color: "#fff",
  };

  return (
    <div className="radio-container">
      <Box
        className="radio-label"
        sx={[
          {
            backgroundColor: props.color,
            opacity: 0.6,
          },
          props.selectedCategory === props.id && selectedStyles,
        ]}
        onClick={() => props.setCategory(props.id)}
      >
        <span className="radio__category-icon">{props.icon}</span>
        <span>{props.title}</span>
      </Box>
    </div>
  );
}
