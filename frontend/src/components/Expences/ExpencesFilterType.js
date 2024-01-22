import React, { useContext, useEffect, useRef, useState } from "react";
import ExpencesFilter from "./ExpencesFilter";
import "./ExpenceFilterType.css";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ExpencesFilterType() {
  const { setFilterValue } = useContext(ExpensesContext);
  const [selectedValue, setSelectedValue] = useState("thisMonth");
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "all", label: "All" },
    { value: "thisMonth", label: "This month" },
    { value: "lastMonth", label: "Last month" },
    { value: "thisYear", label: "This year" },
    { value: "lastYear", label: "Last year" },
  ];

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    setFilterValue(value);
    setIsOptionsVisible(false);
  };

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="select-box__container">
      <div className="custom-dropdown">
        <Button
          endIcon={<KeyboardArrowDownIcon />}
          variant="outlined"
          color="primary"
          onClick={toggleOptionsVisibility}
          sx={{ height: "50px" }}
        >
          {`filter by: ${
            options.find((option) => option.value === selectedValue)?.label
          }`}
        </Button>
        <ul className={`options-list ${isOptionsVisible ? "visible" : ""}`}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelectChange(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      {/* <ExpencesFilter
        className="secondary-select"
        selectedFilter={selectedFilter}
        sortByMonth={handleSortByMonth}
        selectedMonth={sortByMonth}
        sortByYear={handleSortByYear}
        selectedYear={sortByYear}
        sortByCategory={handleSortByCategory}
        selectedCategory={sortByCategory}
      /> */}
    </div>
  );
}
