import React, { useState, useEffect } from "react";
import "./Expences.css";
import ExpenceItem from "./ExpenceItem";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import AddNewExpence from "../AddNewExpence/AddNewExpence";
import ExpencesFilterType from "./ExpencesFilterType";
import { categoriesList } from "./ExpencesCategories";
import AddBoxIcon from "@mui/icons-material/AddBox";

//SCROLLING DOWN FUNCTION
let isDown = false;
let startY;
let scrollDown;

const mouseDown = (e) => {
  isDown = true;
  const slider = document.getElementById("expences-container__child");
  slider.classList.add("scrolling");
  startY = e.pageY - slider.offsetTop;
  scrollDown = slider.scrollTop;
};

const mouseLeave = () => {
  isDown = false;
  document
    .getElementById("expences-container__child")
    .classList.remove("scrolling");
};

const mouseUp = () => {
  isDown = false;
  document
    .getElementById("expences-container__child")
    .classList.remove("scrolling");
};

const mouseMove = (e) => {
  if (!isDown) return;
  e.preventDefault();
  const slider = document.getElementById("expences-container__child");
  const y = e.pageY - slider.offsetTop;
  const walk = y - startY;
  slider.scrollTop = scrollDown - walk;
};

export default function Expences(props) {
  //DATES FOR FILTERING
  const today = new Date();
  const yearToday = Number(today.getFullYear());
  const monthToday = Number(today.getMonth());
  const defaultCategory = categoriesList[0].id;

  //NEW EXPENSE POPUP
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  //FIRESTORE COLLECTION
  const transactionsCollectionRef = collection(db, "transactions");
  // const { currentUser } = useAuth();
  // const filterByUserQuery = query(
  //   transactionsCollectionRef,
  //   where("userID", "==", currentUser.uid)
  // );

  //OTHER
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("thisMonth");
  const [sortByMonth, setSortByMonth] = useState(monthToday);
  const [sortByYear, setSortByYear] = useState(yearToday);
  const [sortByCategory, setSortByCategory] = useState(defaultCategory);

  //TOTAL SUM var
  let filteredTotalSum = 0;
  let thisMonthTotalSum = 0;

  //PULLING TRANSACTIONS FROM FIREBASE
  // useEffect(() => {
  //   const getTransactions = async () => {
  //     const data = await getDocs(filterByUserQuery);
  //     setTransactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getTransactions();
  // }, [refreshKey]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    // props.onFilterChange(filteredTransactions, filter);
  };

  const handleSortByYear = (year) => {
    setSortByYear(Number(year));
  };

  const handleSortByCategory = (category) => {
    setSortByCategory(category);
  };

  const handleSortByMonth = (month) => {
    setSortByMonth(Number(month));
  };

  const updateRefreshKey = () => {
    setRefreshKey(refreshKey + 1);
  };

  // //FILTERING TRANSACTIONS ARRAY
  // const filteredTransactions = transactions
  //   .filter(function (e) {
  //     switch (selectedFilter) {
  //       case "all":
  //         return currentUser.uid === e.userID;
  //         break;
  //       case "thisMonth":
  //         return (
  //           new Date(e.date.seconds * 1000).getMonth() === monthToday &&
  //           new Date(e.date.seconds * 1000).getFullYear() === yearToday
  //         );
  //         break;
  //       case "thisYear":
  //         return new Date(e.date.seconds * 1000).getFullYear() === yearToday;
  //         break;
  //       case "lastMonth":
  //         if (new Date().getMonth() === 0) {
  //           return (
  //             new Date(e.date.seconds * 1000).getMonth() === 11 &&
  //             new Date(e.date.seconds * 1000).getFullYear() === yearToday - 1
  //           );
  //         } else {
  //           return (
  //             new Date(e.date.seconds * 1000).getMonth() === monthToday - 1 &&
  //             new Date(e.date.seconds * 1000).getFullYear() === yearToday
  //           );
  //         }
  //         break;
  //       case "lastYear":
  //         return (
  //           new Date(e.date.seconds * 1000).getFullYear() === yearToday - 1
  //         );
  //         break;
  //     }
  //   })
  //   .sort();

  const filteredTransactions = [];

  //PASSING FILTERRED TRANSACTIONS ARRAY TO PARENT
  useEffect(() => {
    const handleFiltering = () =>
      props.onFilterChange(filteredTransactions, selectedFilter);
    handleFiltering();
  }, [selectedFilter, sortByMonth, sortByYear, sortByCategory, refreshKey]);

  //SORTING TRANSACTIONS ARRAY BY DATE - FROM OLDEST TO NEWEST
  filteredTransactions.sort(function (a, b) {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });

  return (
    <div className="expences-container">
      <AddNewExpence
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onUpdate={updateRefreshKey}
        addNewExpence
      ></AddNewExpence>
      <div className="expences-container__controls">
        <div className="new-expence__container" onClick={() => setIsOpen(true)}>
          <div className="new-expence__icon">
            <AddBoxIcon />
          </div>
          <div className="new-expence__title">Add new</div>
        </div>
        <ExpencesFilterType
          onFilterChange={handleFilterChange}
          sortByMonth={handleSortByMonth}
          monthToday={monthToday}
          sortByYear={handleSortByYear}
          yearToday={yearToday}
          sortByCategory={handleSortByCategory}
          defaultCategory={defaultCategory}
        />
      </div>
      <div
        className="expences-container__expences"
        id="expences-container__child"
        onMouseDown={mouseDown}
        onMouseLeave={mouseLeave}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      >
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => {
            filteredTotalSum += Number(transaction.amount);
            return (
              <ExpenceItem
                key={transaction.id}
                title={transaction.title}
                amount={transaction.amount}
                date={transaction.date}
                category={transaction.category}
                expenceID={transaction.id}
                onUpdate={updateRefreshKey}
              />
            );
          })
        ) : (
          <span className="transactions-error">
            No matching transactions found
          </span>
        )}
      </div>
    </div>
  );
}
