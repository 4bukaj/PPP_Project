import React, { useState } from "react";
import "./Home.css";
import Expences from "../Expences/Expences";
import DoughnutChart from "../Charts/DoughnutChart";
import { motion } from "framer-motion";

export default function Home() {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleImportFilteredTransactions = (uploadedTransactions, filter) => {
    setFilteredTransactions(uploadedTransactions);
    setSelectedFilter(filter);
  };

  return (
    <div className="home-container">
      <div className="home-chart__container">
        {filteredTransactions.length > 0 ? (
          <DoughnutChart
            data={filteredTransactions}
            activeFilter={selectedFilter}
          />
        ) : (
          <div className="noTransactions">
            <h3>No transactions found!</h3>
          </div>
        )}
      </div>
      <motion.div
        className="home-expenses__container"
        initial={{ y: "-100vw" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "linear" }}
      >
        <Expences onFilterChange={handleImportFilteredTransactions} />
      </motion.div>
    </div>
  );
}
