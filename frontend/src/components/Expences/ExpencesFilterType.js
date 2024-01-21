import React, { useContext, useState } from "react";
import ExpencesFilter from "./ExpencesFilter";
import "./ExpenceFilterType.css";
import { motion } from "framer-motion";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export default function ExpencesFilterType() {
  const { setFilterValue } = useContext(ExpensesContext);

  return (
    <div className="select-box__container">
      <motion.div
        initial={{ x: "100vh" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <select
          onChange={(e) => setFilterValue(e.target.value)}
          defaultValue={"thisMonth"}
        >
          <option value="all">All</option>
          <option value="thisMonth">This month</option>
          <option value="lastMonth">Last month</option>
          <option value="thisYear">This year</option>
          <option value="lastYear">Last year</option>
        </select>
      </motion.div>
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
