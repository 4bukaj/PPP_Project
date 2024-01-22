import "./CryptoPortfolio.css";
import CryptoPortfolioItem from "./CryptoPortfolioItem";

export default function CryptoPortfolio({ crypto, allCoins }) {
  const portfolio = [];

  crypto.forEach((item) => {
    let cur = portfolio.find((x) => x.coin === item.coin);
    if (cur) {
      cur.amount += Number(item.amount);
      cur.value += Number(item.value);
      cur.avgRate = (cur.avgRate + item.value / item.amount) / (cur.num + 1);
    } else {
      portfolio.push({
        coin: item.coin,
        amount: Number(item.amount),
        value: Number(item.value),
        image: item.image,
        avgRate: item.value / item.amount,
        num: 1,
        pnl: 0,
      });
    }
  });

  portfolio.forEach((item) => {
    let curVal =
      allCoins.find((x) => x.symbol === item.coin.toLowerCase()).current_price *
      item.amount;
    item.pnl = ((curVal - item.value) / item.value) * 100;
  });

  return (
    <div className="coins-portfolio">
      <div className="coins-portfolio-header">
        <div>Crypto</div>
        <div>Total value</div>
        <div>Avg. rate</div>
        <div>PNL</div>
      </div>
      {portfolio.length > 0 ? (
        portfolio
          .sort((a, b) => b.value - a.value)
          .map((coin) => {
            return (
              <CryptoPortfolioItem
                key={coin.coin}
                coin={coin.coin}
                value={coin.value}
                image={coin.image}
                avgRate={coin.avgRate}
                pnl={coin.pnl}
              />
            );
          })
      ) : (
        <span className="transactions-error">No transactions found!</span>
      )}
    </div>
  );
}
