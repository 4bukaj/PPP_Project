import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./styles.css";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import axios from "axios";

export default function Dashboard() {
  const auth = useAuthUser();
  const [session, setSession] = useState(auth);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/expenses/user/${session.id}`)
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <ExpensesContext.Provider
          value={{ session, setSession, expenses, setExpenses }}
        >
          <Outlet />
        </ExpensesContext.Provider>
      </div>
    </div>
  );
}
