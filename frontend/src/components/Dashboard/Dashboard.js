import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import SideNav from "./SideNav";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <SideNav />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
