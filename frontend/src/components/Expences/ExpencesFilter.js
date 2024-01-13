import React from "react";
import { categoriesList } from "./ExpencesCategories";
import { motion } from "framer-motion";

const today = new Date();
const yearToday = today.getFullYear();
const monthToday = today.getMonth();
const months = [
  { name: "January", id: 0 },
  { name: "February", id: 1 },
  { name: "March", id: 2 },
  { name: "April", id: 3 },
  { name: "May", id: 4 },
  { name: "June", id: 5 },
  { name: "July", id: 6 },
  { name: "August", id: 7 },
  { name: "September", id: 8 },
  { name: "October", id: 9 },
  { name: "November", id: 10 },
  { name: "December", id: 11 },
];

const sortedMonths = [
  ...months.slice(monthToday + 1),
  ...months.slice(0, monthToday + 1),
].reverse();

export default function ExpencesFilter(props) {
  const filterType = props.selectedFilter;

  switch (filterType) {
    case "all":
      return <span></span>;
      break;
    case "thisYear":
      return <span></span>;
      break;
    case "thisMonth":
      return <span></span>;
      break;
    case "byMonth":
      return (
        <motion.div
          className="secondary-select"
          initial={{ x: "100vh" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <select
            defaultValue={props.selectedMonth}
            onChange={(event) => props.sortByMonth(event.target.value)}
          >
            {sortedMonths.map((month) => {
              return (
                <option key={month.name} value={month.id}>
                  {month.name}
                </option>
              );
            })}
          </select>
        </motion.div>
      );
      break;
    case "byYear":
      return (
        <motion.div
          className="secondary-select"
          initial={{ x: "100vh" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <select
            defaultValue={props.selectedYear}
            onChange={(event) => props.sortByYear(event.target.value)}
          >
            <option value={yearToday}>{yearToday}</option>
            <option value={yearToday - 1}>{yearToday - 1}</option>
            <option value={yearToday - 2}>{yearToday - 2}</option>
            <option value={yearToday - 3}>{yearToday - 3}</option>
            <option value={yearToday - 4}>{yearToday - 4}</option>
            <option value={yearToday - 5}>{yearToday - 5}</option>
          </select>
        </motion.div>
      );
      break;
    case "byCategory":
      return (
        <motion.div
          className="secondary-select"
          initial={{ x: "100vh" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <select
            defaultValue={props.selectedCategory}
            onChange={(event) => props.sortByCategory(event.target.value)}
          >
            {categoriesList.map((category) => {
              return (
                <option key={category.title} value={category.id}>
                  {category.title}
                </option>
              );
            })}
          </select>
        </motion.div>
      );
      break;
  }
}
