import "./styles.css";
import Expences from "../../components/Expences/Expences";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import AddNewExpence from "../../components/AddNewExpence/AddNewExpence";
import { useContext } from "react";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export default function Home() {
  const {
    expenses,
    filteredExpenses,
    selectedFilter,
    setSelectedFilter,
    popupOpen,
    setPopupOpen,
  } = useContext(ExpensesContext);

  const handleImportFilteredTransactions = (uploadedTransactions, filter) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <div className="home-container">
        {expenses.length ? (
          <>
            <div className="home-chart__container">
              {filteredExpenses.length > 0 ? (
                <DoughnutChart
                  data={filteredExpenses}
                  activeFilter={selectedFilter}
                />
              ) : (
                <div className="noTransactions">
                  <img
                    src={process.env.PUBLIC_URL + "/img/no-data.png"}
                    alt=""
                    className="emptyBg"
                  />
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
          </>
        ) : (
          <div className="empty-state-container">
            <img
              src={process.env.PUBLIC_URL + "/img/no-data.png"}
              alt=""
              className="emptyBg"
            />
            <h1>Looks like you don' have any expenses yet</h1>
            <Button
              variant="contained"
              color="secondary"
              sx={{ padding: "10px 30px", fontSize: 16 }}
              onClick={() => setPopupOpen(true)}
            >
              Add first expense
            </Button>
          </div>
        )}
      </div>

      <AddNewExpence
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        addNewExpence
      />
    </>
  );
}
