import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import CryptoCarousel from "../../components/Crypto/CryptoCarousel";
import HeaderItem from "../../components/Crypto/HeaderItem";
import CoinsList from "../../components/Crypto/CoinsList";
import { numberWithCommas } from "../../components/Crypto/CryptoCarousel";
import AddNewExpence from "../../components/AddNewExpence/AddNewExpence";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CryptoPortfolio from "../../components/Crypto/CryptoPortfolio";
import { mockCryptoData } from "../../components/Crypto/mockData";
import { Button } from "@mui/material";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import axios from "axios";
import { CoinList } from "../../config/api";

export default function Crypto() {
  const { session } = useContext(ExpensesContext);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [crypto, setCrypto] = useState([]);
  const [totalInvestments, setTotalInvestments] = useState();
  const [currentInvestments, setCurrentInvestments] = useState();
  const [allTimePNLpercentage, setAllTimePNLpercentage] = useState(0);
  const [allTimePNLnum, setAllTimePNLnum] = useState(0);
  const [dailyPNLnum, setDailyPNLnum] = useState(0);
  const [dailyPNLpercentage, setDailyPNLpercentage] = useState(0);
  const [allCoins, setAllCoins] = useState([]);

  useEffect(() => {
    const fetchAllCoins = async () => {
      axios
        .get(CoinList("PLN"))
        .then((res) => {
          console.log("Fetched crypto data");
          setAllCoins(res.data);

          const payload = JSON.stringify(res.data);

          axios.post(`http://127.0.0.1:8000/save-krypto-data/`, {
            details: payload,
          });
        })
        .catch((error) => {
          console.log("Error while fetching crypto data");
          console.log(error);

          axios
            .get(`http://127.0.0.1:8000/get-latest-krypto-data/`)
            .then((res) => {
              const data = JSON.parse(res.data.details);
              setAllCoins(data);
            });
        });
    };
    fetchAllCoins();
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/kryptos/get/${session.id}/`)
      .then((res) => {
        const data = res.data.map((item) => ({
          coin: item.Coin,
          amount: item.Amount,
          value: item.Worth,
          image: item.ImageUrl,
          createdAt: item.CreatedAt,
        }));
        setCrypto(data);
      })
      .catch((e) => console.log(e));
  }, []);

  //CALCULATING PORTFOLIO NUMBERS
  useEffect(() => {
    const calculateTotalInvestments = () => {
      let sumCurr = 0;
      let sumYesterday = 0;
      const sumInv = crypto.reduce((acc, item) => acc + Number(item.value), 0);

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
  }, [crypto, allCoins]);

  return (
    <div className="crypto-container">
      <AddNewExpence
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onUpdate={() => setRefreshKey(refreshKey + 1)}
        crypto={allCoins}
        setCrypto={setCrypto}
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
            {crypto.length ? (
              <Button
                startIcon={<AddBoxIcon />}
                variant="outlined"
                color="primary"
                onClick={() => setIsOpen(true)}
                sx={{ height: "50px", mb: 2 }}
              >
                Add new transaction
              </Button>
            ) : null}
          </div>
          <CoinsList
            cryptoList={allCoins}
            portfolioList={crypto}
            open={setIsOpen}
          />
        </div>
        {crypto.length ? (
          <div className="crypto-summary">
            <div className="coins-list-header righty">
              <h3 className="crypto-h3">YOUR PORTFOLIO</h3>
            </div>
            <CryptoPortfolio crypto={crypto} allCoins={allCoins} />
          </div>
        ) : (
          <p style={{ marginTop: "15px", color: "var(--primary)" }}>
            Add first crypto transaction to view your <b>portfolio</b>.
          </p>
        )}
      </div>
    </div>
  );
}
