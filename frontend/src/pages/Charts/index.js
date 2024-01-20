import React, { useState, useEffect } from "react";
import "./styles.css";
import BarChart from "../../components/Charts/BarChart";
import { categoriesList } from "../../components/Expences/utils";

export function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.4)"
    );
  }
  throw new Error("Bad Hex");
}

export default function Charts(props) {
  //PULL TRANSACTIONS FROM DATABASE
  const [transactions, setTransactions] = useState([]);
  // const { currentUser } = useAuth();
  // const filterByUserQuery = query(
  //   transactionsCollectionRef,
  //   where("userID", "==", currentUser.uid)
  // );

  // useEffect(() => {
  //   const getTransactions = async () => {
  //     const data = await getDocs(filterByUserQuery);
  //     setTransactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getTransactions();
  // }, []);

  //REST
  const expensesByCategoriesMonth = [];
  const expensesByCategoriesYear = [];
  const biggestExpenses = [];
  const expensesByMonths = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const today = new Date();
  const yearToday = Number(today.getFullYear());
  const monthToday = Number(today.getMonth());

  const transactionsThisMonth = transactions.filter(function (e) {
    return (
      new Date(e.date.seconds * 1000).getMonth() === monthToday &&
      new Date(e.date.seconds * 1000).getFullYear() === yearToday
    );
  });

  const transactionsThisYear = transactions.filter(function (e) {
    return new Date(e.date.seconds * 1000).getFullYear() === yearToday;
  });

  for (const expense in transactionsThisYear) {
    const expenseMonth = new Date(
      transactionsThisYear[expense].date.seconds * 1000
    ).getMonth();
    expensesByMonths[expenseMonth].value += Number(
      transactionsThisYear[expense].amount
    );
  }

  transactionsThisMonth.forEach((item) => {
    let cur = expensesByCategoriesMonth.find((x) => x.label === item.category);
    if (cur) {
      cur.value += Number(item.amount);
    } else {
      expensesByCategoriesMonth.push({
        label: item.category,
        value: Number(item.amount),
        bgColor: categoriesList.find((x) => x.id === item.category).color,
      });
    }
    //BIGGEST EXPENSE
    biggestExpenses.push({
      label: item.title,
      value: Number(item.amount),
      bgColor: categoriesList.find((x) => x.id === item.category).color,
    });
  });

  const biggestExpensesMonth = biggestExpenses
    .sort((a, b) => (a.value < b.value ? 1 : -1))
    .slice(0, 5);

  transactionsThisYear.forEach((item) => {
    let cur = expensesByCategoriesYear.find((x) => x.label === item.category);
    if (cur) {
      cur.value += Number(item.amount);
    } else {
      expensesByCategoriesYear.push({
        label: item.category,
        value: Number(item.amount),
        bgColor: categoriesList.find((x) => x.id === item.category).color,
      });
    }
  });

  const expensesByCategoriesMonthChartData = {
    labels: expensesByCategoriesMonth.map((data) =>
      capitalizeFirstLetter(data.label)
    ),
    datasets: [
      {
        data: expensesByCategoriesMonth.map((data) => data.value),
        backgroundColor: expensesByCategoriesMonth.map((data) =>
          hexToRgbA(data.bgColor)
        ),
        hoverBackgroundColor: expensesByCategoriesMonth.map(
          (data) => data.bgColor
        ),
        borderColor: expensesByCategoriesMonth.map((data) => data.bgColor),
      },
    ],
  };

  const expensesByCategoriesyYearChartData = {
    labels: expensesByCategoriesYear.map((data) =>
      capitalizeFirstLetter(data.label)
    ),
    datasets: [
      {
        data: expensesByCategoriesYear.map((data) => data.value),
        backgroundColor: expensesByCategoriesYear.map((data) =>
          hexToRgbA(data.bgColor)
        ),
        hoverBackgroundColor: expensesByCategoriesYear.map(
          (data) => data.bgColor
        ),
        borderColor: expensesByCategoriesYear.map((data) => data.bgColor),
      },
    ],
  };

  const expensesByMonthsChartData = {
    labels: expensesByMonths.map((data) => capitalizeFirstLetter(data.label)),
    datasets: [
      {
        data: expensesByMonths.map((data) => data.value),
        barPercentage: 1,
        backgroundColor: ["rgba(32, 66, 84, 0.4)", "rgba(185, 74, 62, 0.4)"],
        hoverBackgroundColor: ["rgba(32, 66, 84, 1)", "rgba(185, 74, 62, 1)"],
        borderColor: ["rgba(32, 66, 84, 1)", "rgba(185, 74, 62, 1)"],
      },
    ],
  };

  const biggestExpensesMonthChartData = {
    labels: biggestExpensesMonth.map((data) =>
      capitalizeFirstLetter(data.label)
    ),
    datasets: [
      {
        data: biggestExpensesMonth.map((data) => data.value),
        barPercentage: 1,
        backgroundColor: biggestExpensesMonth.map((data) =>
          hexToRgbA(data.bgColor)
        ),
        hoverBackgroundColor: biggestExpensesMonth.map((data) => data.bgColor),
        borderColor: biggestExpensesMonth.map((data) => data.bgColor),
      },
    ],
  };

  return (
    <div className="charts-container">
      <div className="single-chart">
        <BarChart
          chartData={expensesByCategoriesMonthChartData}
          title="Spendings this month"
          subtitle="Sorted by categories"
        />
      </div>
      <div className="single-chart">
        <BarChart
          chartData={biggestExpensesMonthChartData}
          title="Biggest spendings this month"
          subtitle="Take a look at what you spent the most on this month"
          horizontal
        />
      </div>
      <div className="single-chart">
        <BarChart
          chartData={expensesByCategoriesyYearChartData}
          title="Spendings this year"
          subtitle="Sorted by categories"
        />
      </div>
      <div className="single-chart">
        <BarChart
          chartData={expensesByMonthsChartData}
          title="Total spendings this year"
          subtitle="Sorted by months"
        />
      </div>
    </div>
  );
}
