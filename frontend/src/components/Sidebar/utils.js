import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <HomeIcon />,
    className: "nav-text",
  },
  {
    title: "Charts",
    path: "/charts",
    icon: <BarChartIcon />,
    className: "nav-text",
  },
  {
    title: "Crypto",
    path: "/crypto",
    icon: <CurrencyBitcoinIcon />,
    className: "nav-text",
  },
];
