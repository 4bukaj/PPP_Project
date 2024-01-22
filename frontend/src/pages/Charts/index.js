import React, { useContext } from "react";
import "./styles.css";
import BarChart from "../../components/Charts/BarChart";
import { categoriesList } from "../../components/Expences/utils";
import { hexToRgbA } from "../../utils";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import { getMonth, isThisMonth, isThisYear } from "date-fns";

export default function Charts(props) {
  const { expenses } = useContext(ExpensesContext);

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

  const transactionsThisMonth = expenses.filter((e) =>
    isThisMonth(new Date(e.Date))
  );

  const transactionsThisYear = expenses.filter((e) =>
    isThisYear(new Date(e.Date))
  );

  for (const expense of transactionsThisYear) {
    const expenseMonth = getMonth(new Date(expense.Date));
    expensesByMonths[expenseMonth].value += Number(
      transactionsThisYear.find((t) => t.id === expense.id).Amount
    );
  }

  transactionsThisMonth.forEach((item) => {
    let cur = expensesByCategoriesMonth.find((x) => x.label === item.Category);
    if (cur) {
      cur.value += Number(item.Amount);
    } else {
      expensesByCategoriesMonth.push({
        label: item.Category,
        value: Number(item.Amount),
        bgColor: categoriesList[item.Category].color,
      });
    }
    //BIGGEST EXPENSE
    biggestExpenses.push({
      label: item.Title,
      value: Number(item.Amount),
      bgColor: categoriesList[item.Category].color,
    });
  });

  const biggestExpensesMonth = biggestExpenses
    .sort((a, b) => (a.value < b.value ? 1 : -1))
    .slice(0, 5);

  transactionsThisYear.forEach((item) => {
    let cur = expensesByCategoriesYear.find((x) => x.label === item.Category);
    if (cur) {
      cur.value += Number(item.Amount);
    } else {
      expensesByCategoriesYear.push({
        label: item.Category,
        value: Number(item.Amount),
        bgColor: categoriesList[item.Category].color,
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
