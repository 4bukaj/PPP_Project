import React, { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import "./styles.css";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import { fetchExpenses } from "../../utils";
import {
  isSameMonth,
  isSameYear,
  isThisMonth,
  isThisYear,
  subMonths,
  subYears,
} from "date-fns";
import axios from "axios";

export default function Dashboard() {
  const auth = useAuthUser();
  const [session, setSession] = useState(auth);
  const [expenses, setExpenses] = useState([]);
  const [filterValue, setFilterValue] = useState("thisMonth");

  useEffect(() => {
    const fn = async () => {
      const data = await fetchExpenses(session.id);
      setExpenses(data);
    };
    fn();
  }, []);

  const returnFilter = (expenseDate, optFilter) => {
    const f = optFilter ?? filterValue;
    const date = new Date(expenseDate);
    switch (f) {
      case "thisMonth":
        return isThisMonth(date);
      case "lastMonth":
        return isSameMonth(date, subMonths(new Date(), 1));
      case "thisYear":
        return isThisYear(date);
      case "lastYear":
        return isSameYear(date, subYears(new Date(), 1));
      default:
        return true;
    }
  };

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((expense) => returnFilter(expense.Date))
      .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
  }, [expenses, filterValue]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <ExpensesContext.Provider
          value={{
            session,
            setSession,
            expenses,
            setExpenses,
            filteredExpenses,
            filterValue,
            setFilterValue,
            returnFilter,
          }}
        >
          <Outlet />
        </ExpensesContext.Provider>
      </div>
    </div>
  );
}
