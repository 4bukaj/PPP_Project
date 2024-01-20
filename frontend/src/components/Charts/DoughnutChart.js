import React from "react";
import { Doughnut } from "react-chartjs-2";
import { categoriesList } from "../Expences/utils";
import { hexToRgbA } from "../../pages/Charts";
import Chart from "chart.js/auto";
import "./DoughnutChart.css";
import { numberWithCommas } from "../Crypto/CryptoCarousel";
import { useState } from "react";
import { useEffect } from "react";

export default function DoughnutChart({ data, activeFilter }) {
  const [subtitleFilter, setSubtitleFilter] = useState("");
  const [summaryFilter, setSummaryFilter] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const updateRefreshKey = () => {
    setRefreshKey(refreshKey + 1);
  };

  const today = new Date();
  const yearToday = Number(today.getFullYear());
  const monthToday = Number(today.getMonth());

  // //FILTERING TRANSACTIONS ARRAY
  // const filteredTransactions = transactions.filter(function (e) {
  //   switch (activeFilter) {
  //     case "all":
  //       return 123 === e.userID;
  //       break;
  //     case "thisMonth":
  //       if (new Date().getMonth() === 0) {
  //         return (
  //           new Date(e.date.seconds * 1000).getMonth() === 11 &&
  //           new Date(e.date.seconds * 1000).getFullYear() === yearToday - 1
  //         );
  //       } else {
  //         return (
  //           new Date(e.date.seconds * 1000).getMonth() === monthToday - 1 &&
  //           new Date(e.date.seconds * 1000).getFullYear() === yearToday
  //         );
  //       }
  //       break;
  //     case "thisYear":
  //       return new Date(e.date.seconds * 1000).getFullYear() === yearToday - 1;
  //       break;
  //     case "lastMonth":
  //       return (
  //         new Date(e.date.seconds * 1000).getMonth() === monthToday &&
  //         new Date(e.date.seconds * 1000).getFullYear() === yearToday
  //       );
  //       break;
  //     case "lastYear":
  //       return new Date(e.date.seconds * 1000).getFullYear() === yearToday;
  //       break;
  //   }
  // });

  const filteredTransactions = [];

  useEffect(() => {
    const filter = () => {
      switch (activeFilter) {
        case "thisMonth":
          setSubtitleFilter("this month");
          setSummaryFilter("last month");
          break;
        case "lastMonth":
          setSubtitleFilter("last month");
          setSummaryFilter("this month");
          break;
        case "thisYear":
          setSubtitleFilter("this year");
          setSummaryFilter("last year");
          break;
        case "lastYear":
          setSubtitleFilter("last year");
          setSummaryFilter("this year");
          break;
        case "all":
          setSubtitleFilter("all time");
          break;
      }
    };

    filter();
  }, [activeFilter]);

  let activeSum = 0;
  let compSum = 0;
  let operator = "";
  let summaryPercentage = 0;

  for (const expense of data) {
    activeSum += Number(expense.amount);
  }

  for (const expense of filteredTransactions) {
    compSum += Number(expense.amount);
  }

  if (activeSum > compSum) {
    summaryPercentage = (((activeSum - compSum) / compSum) * 100).toFixed(0);
    operator = "more";
  } else {
    summaryPercentage = (((compSum - activeSum) / activeSum) * 100).toFixed(0);
    operator = "less";
  }

  const ChartData = {
    labels: data.map((data) => data.title),
    datasets: [
      {
        data: data.map((data) => data.amount),
        barPercentage: 1,
        // backgroundColor: data.map((data) =>
        //   hexToRgbA(categoriesList.find((x) => x.id === data.category).color)
        // ),
        // hoverBackgroundColor: data.map(
        //   (data) => categoriesList.find((x) => x.id === data.category).color
        // ),
        // borderColor: data.map(
        //   (data) => categoriesList.find((x) => x.id === data.category).color
        // ),
        backgroundColor: "#373737",
        borderColor: "red",
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
          Total spendings {subtitleFilter}
        </span>
        {subtitleFilter === "all time" ? (
          ""
        ) : (
          <span className="total-sum__summary">
            You spent{" "}
            <span className={activeSum > compSum ? "flag-red" : "flag-green"}>
              {summaryPercentage}% {operator}
            </span>{" "}
            than {summaryFilter}
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
