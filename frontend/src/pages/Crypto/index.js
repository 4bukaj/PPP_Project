import React, { useState, useEffect } from "react";
import "./styles.css";
import CryptoCarousel from "../../components/Crypto/CryptoCarousel";
import HeaderItem from "../../components/Crypto/HeaderItem";
import CoinsList from "../../components/Crypto/CoinsList";
import { CoinList } from "../../config/api";
import axios from "axios";
import { numberWithCommas } from "../../components/Crypto/CryptoCarousel";
import AddNewExpence from "../../components/AddNewExpence/AddNewExpence";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CryptoPortfolio from "../../components/Crypto/CryptoPortfolio";

export default function Crypto() {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  // const { currentUser } = useAuth();
  const [crypto, setCrypto] = useState([]);
  const [totalInvestments, setTotalInvestments] = useState();
  const [currentInvestments, setCurrentInvestments] = useState();
  const [allTimePNLpercentage, setAllTimePNLpercentage] = useState(0);
  const [allTimePNLnum, setAllTimePNLnum] = useState(0);
  const [dailyPNLnum, setDailyPNLnum] = useState(0);
  const [dailyPNLpercentage, setDailyPNLpercentage] = useState(0);

  //PULING CRYPTO FROM API
  const [allCoins, setAllCoins] = useState([]);

  // useEffect(() => {
  //   const fetchAllCoins = async () => {
  //     axios
  //       .get(CoinList("PLN"))
  //       .then((res) => {
  //         setAllCoins(res.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   fetchAllCoins();
  // }, []);

  const fetchAllCoins = async () => {
    const { data } = await axios.get(CoinList("PLN"));

    setAllCoins(data);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  //PULLING CRYPTO FROM FIREBASE

  // useEffect(() => {
  //   const getCrypto = async () => {
  //     const data = await getDocs(filterByUserQuery);
  //     setCrypto(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getCrypto();
  // }, [refreshKey]);

  //CALCULATING PORTFOLIO NUMBERS
  useEffect(() => {
    const calculateTotalInvestments = () => {
      let sumInv = 0;
      let sumCurr = 0;
      let sumYesterday = 0;
      //SUM OF VALUES OF EACH TRANSACTION
      for (const item in crypto) {
        sumInv += Number(crypto[item].value);
      }

      //SUM OF CURRENT VALUE OF ALL ASSETS
      if (allCoins.length > 0) {
        allCoins.forEach((coin) => {
          crypto.forEach((item) => {
            if (item.coin === coin.symbol.toUpperCase()) {
              sumCurr += Number(item.amount * coin.current_price);
              sumYesterday += Number(
                item.amount * (coin.current_price + coin.price_change_24h)
              );
            }
          });
        });
      }

      //CALCULATE ALL TIME PNL
      let allPNLper = ((sumCurr - sumInv) / sumInv) * 100;
      let dailyPNLper = ((sumCurr - sumYesterday) / sumYesterday) * 100;

      setAllTimePNLnum((sumCurr - sumInv).toFixed(2));
      setAllTimePNLpercentage(allPNLper.toFixed(2));
      setDailyPNLnum((sumCurr - sumYesterday).toFixed(2));
      setDailyPNLpercentage(dailyPNLper.toFixed(2));
      setTotalInvestments(numberWithCommas(sumInv.toFixed(2)));
      setCurrentInvestments(numberWithCommas(sumCurr.toFixed(2)));
    };

    calculateTotalInvestments();
  }, [crypto]);

  return (
    <div className="crypto-container">
      <AddNewExpence
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onUpdate={() => setRefreshKey(refreshKey + 1)}
        crypto={allCoins}
      />
      <div className="crypto-header">
        <div className="crypto-header__container">
          <HeaderItem
            title="Current portfolio value"
            number={currentInvestments}
          />
        </div>
        <div className="crypto-header__container">
          <HeaderItem title="Total investments" number={totalInvestments} />
        </div>
        <div className="crypto-header__container">
          <HeaderItem
            title="Today's PNL"
            number={dailyPNLnum}
            percentage={dailyPNLpercentage}
            pnl
          />
        </div>
        <div className="crypto-header__container">
          <HeaderItem
            title="All time's PNL "
            number={allTimePNLnum}
            percentage={allTimePNLpercentage}
            pnl
          />
        </div>
      </div>
      <div className="crypto-carousel">
        <CryptoCarousel />
      </div>
      <div className="crypto-bottom-row">
        <div className="crypto-list">
          <div className="coins-list-header">
            <h3 className="crypto-h3">List of transactions</h3>
            <div
              className="new-expence__container"
              onClick={() => setIsOpen(true)}
              style={{ width: 25 + "%" }}
            >
              <AddBoxIcon />
            </div>
          </div>
          <CoinsList cryptoList={allCoins} portfolioList={crypto} />
        </div>
        <div className="crypto-summary">
          <div className="coins-list-header righty">
            <h3 className="crypto-h3">Your portfolio</h3>
          </div>
          <CryptoPortfolio crypto={crypto} allCoins={allCoins} />
        </div>
      </div>
    </div>
  );
}
