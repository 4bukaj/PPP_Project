import React from "react";
import "./CoinsList.css";
import CoinsListItem from "./CoinsListItem";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function CoinsList({ portfolioList, cryptoList, open }) {
  return (
    <div>
      <div className="coins-list">
        <div className="coins-list-header">
          <div>Crypto</div>
          <div>Amount</div>
          <div>Value</div>
          <div>Time</div>
        </div>
        {portfolioList.length > 0 ? (
          portfolioList
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((coin) => {
              return (
                <CoinsListItem
                  key={coin.coin + coin.amount}
                  coin={coin.coin}
                  amount={coin.amount}
                  value={coin.value}
                  image={coin.image}
                  createdAt={coin.createdAt}
                />
              );
            })
        ) : (
          <Button
            startIcon={<AddBoxIcon />}
            variant="outlined"
            color="primary"
            onClick={() => open(true)}
            sx={{ height: "50px", mt: 3 }}
          >
            Add first transaction
          </Button>
        )}
      </div>
    </div>
  );
}
