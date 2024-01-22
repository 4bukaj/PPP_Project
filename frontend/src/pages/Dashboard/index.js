import { Outlet } from "react-router-dom";
import "./styles.css";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { fetchExpenses } from "../../utils";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  isSameMonth,
  isSameYear,
  isThisMonth,
  isThisYear,
  subMonths,
  subYears,
} from "date-fns";

export default function Dashboard() {
  const auth = useAuthUser();
  const [session, setSession] = useState(auth);
  const [expenses, setExpenses] = useState([]);
  const [filterValue, setFilterValue] = useState("thisMonth");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

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

  function customSort(a, b) {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);
    const createdAtA = new Date(a.CreatedAt);
    const createdAtB = new Date(b.CreatedAt);

    // Compare by Date in descending order
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;

    // If Date is the same, compare by CreatedAt in descending order
    if (createdAtA > createdAtB) return -1;
    if (createdAtA < createdAtB) return 1;

    return 0;
  }

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((expense) => returnFilter(expense.Date))
      .sort(customSort);
  }, [expenses, filterValue]);

  return (
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
        popupOpen,
        setPopupOpen,
      }}
    >
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </ExpensesContext.Provider>
  );
}
