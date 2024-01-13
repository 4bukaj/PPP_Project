import React, { useState } from "react";
import ExpencesFilter from "./ExpencesFilter";
import "./ExpenceFilterType.css";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExpencesFilterType(props) {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortByMonth, setSortByMonth] = useState(props.monthToday);
  const [sortByYear, setSortByYear] = useState(props.yearToday);
  const [sortByCategory, setSortByCategory] = useState(props.defaultCategory);

  const handleSortByYear = (year) => {
    setSortByYear(year);
  };

  const handleSortByCategory = (category) => {
    setSortByCategory(category);
  };

  const handleSortByMonth = (month) => {
    setSortByMonth(month);
  };

  useEffect(() => {
    props.sortByYear(sortByYear);
  }, [sortByYear]);

  useEffect(() => {
    props.sortByCategory(sortByCategory);
  }, [sortByCategory]);

  useEffect(() => {
    props.sortByMonth(sortByMonth);
  }, [sortByMonth]);

  return (
    <div className="select-box__container">
      <motion.div
        initial={{ x: "100vh" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <select
          onChange={(event) => {
            props.onFilterChange(event.target.value);
            setSelectedFilter(event.target.value);
          }}
        >
          <option value="thisMonth">This month</option>
          <option value="lastMonth">Last month</option>
          <option value="thisYear">This year</option>
          <option value="lastYear">Last year</option>
          <option value="all">All</option>
        </select>
      </motion.div>
      <ExpencesFilter
        className="secondary-select"
        selectedFilter={selectedFilter}
        sortByMonth={handleSortByMonth}
        selectedMonth={sortByMonth}
        sortByYear={handleSortByYear}
        selectedYear={sortByYear}
        sortByCategory={handleSortByCategory}
        selectedCategory={sortByCategory}
      />
    </div>
  );
}
