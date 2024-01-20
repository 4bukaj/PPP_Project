import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { categoriesList } from "../Expences/utils";
import { hexToRgbA } from "../../pages/Charts";
import "./DoughnutChart.css";
import { numberWithCommas } from "../Crypto/CryptoCarousel";
import { ExpensesContext } from "../../contexts/ExpensesContext";

export default function DoughnutChart({ data, activeFilter }) {
  const { filteredExpenses, expenses, filterValue, returnFilter } =
    useContext(ExpensesContext);

  const renderSubtitleFilter = () => {
    switch (filterValue) {
      case "thisMonth":
        return "this month";
      case "lastMonth":
        return "last month";
      case "thisYear":
        return "this year";
      case "lastYear":
        return "last year";
      default:
        return "all";
    }
  };

  const renderSummaryFilter = () => {
    switch (filterValue) {
      case "thisMonth":
        return "last month";
      case "lastMonth":
        return "this month";
      case "thisYear":
        return "last year";
      case "lastYear":
        return "this year";
      default:
        break;
    }
  };

  const returnCompFilter = () => {
    switch (filterValue) {
      case "thisMonth":
        return "lastMonth";
      case "lastMonth":
        return "thisMonth";
      case "thisYear":
        return "lastYear";
      case "lastYear":
        return "thisYear";
      default:
        break;
    }
  };

  let operator = "";
  let summaryPercentage = 0;

  const activeSum = filteredExpenses.reduce(
    (acc, value) => acc + Number(value.Amount),
    0
  );

  const compSum = expenses
    .filter((expense) => returnFilter(expense.Date, returnCompFilter()))
    .reduce((acc, value) => acc + Number(value.Amount), 0);

  if (activeSum > compSum) {
    summaryPercentage = (((activeSum - compSum) / compSum) * 100).toFixed(0);
    operator = "more";
  } else {
    summaryPercentage = (((compSum - activeSum) / activeSum) * 100).toFixed(0);
    operator = "less";
  }

  const ChartData = {
    labels: filteredExpenses.map((expense) => expense.Title),
    datasets: [
      {
        data: filteredExpenses.map((expense) => expense.Amount),
        barPercentage: 1,
        backgroundColor: filteredExpenses.map((expense) =>
          hexToRgbA(categoriesList[expense.Category].color)
        ),
        hoverBackgroundColor: filteredExpenses.map((expense) =>
          hexToRgbA(categoriesList[expense.Category].color)
        ),
        borderColor: filteredExpenses.map((expense) =>
          hexToRgbA(categoriesList[expense.Category].color)
        ),
        spacing: 30,
      },
    ],
  };

  return (
    <div className="doughnutChart__container">
      <div className="total-sum__container">
        <span className="total-sum__title">
          {numberWithCommas(activeSum.toFixed(2))} zł
        </span>
        <span className="total-sum__subtitle">
          Total spendings {renderSubtitleFilter}
        </span>
        {renderSubtitleFilter() === "all" ? (
          ""
        ) : (
          <span className="total-sum__summary">
            You spent{" "}
            <span className={activeSum > compSum ? "flag-red" : "flag-green"}>
              {summaryPercentage}% {operator}
            </span>{" "}
            than {renderSummaryFilter()}
          </span>
        )}
      </div>
      <Doughnut
        data={ChartData}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
