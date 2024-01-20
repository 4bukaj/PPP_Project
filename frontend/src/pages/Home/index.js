import React, { useContext, useState } from "react";
import "./styles.css";
import Expences from "../../components/Expences/Expences";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import { motion } from "framer-motion";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export default function Home() {
  const { session } = useContext(ExpensesContext);
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
