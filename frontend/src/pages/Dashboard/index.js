import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./styles.css";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Dashboard() {
  const auth = useAuthUser();
  console.log(auth);
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
