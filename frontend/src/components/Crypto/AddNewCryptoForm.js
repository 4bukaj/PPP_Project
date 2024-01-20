import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./AddNewCryptoForm.css";

export default function AddNewCryptoForm({
  crypto,
  onTransactionAdd,
  onClose,
}) {
  //ARRAY OF OPTIONS FOR CRYPTO FORM
  const cryptoOptions = [];
  crypto.forEach((coin) => {
    let obj = {
      label: coin.symbol.toUpperCase(),
    };
    cryptoOptions.push(obj);
  });

  const [enteredCoin, setEnteredCoin] = useState();
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredValue, setEnteredValue] = useState("");

  //HANDLE FORM SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    // await addDoc(cryptoCollectionRef, {
    //   userID: currentUser.uid,
    //   amount: enteredAmount,
    //   coin: enteredCoin,
    //   date: new Date(),
    //   image: "",
    //   value: enteredValue,
    // });
    // onClose();
  };

  const handleValueCalc = (e) => {
    setEnteredAmount(e.target.value);
    if (enteredCoin) {
      const coin = crypto.find((v) => v.symbol === enteredCoin.toLowerCase());
      const currentValue = (coin.current_price * e.target.value).toFixed(2);
      setEnteredValue(currentValue);
    }
  };

  const handleCoinChange = (e) => {
    setEnteredCoin(e.target.innerHTML);
    setEnteredAmount("");
    setEnteredValue("");
  };

  return (
    <form className="crypto-form" onSubmit={handleSubmit}>
      <div className="crypto-form-controls">
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.id === value.id}
          required
          disablePortal
          id="combo-box-demo"
          options={cryptoOptions || []}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="Crypto" />}
          value={enteredCoin || null}
          onChange={handleCoinChange}
        />
        <TextField
          required
          name="amount"
          label="Amount"
          variant="outlined"
          type={"number"}
          InputLabelProps={{ className: "textfield__label-modal" }}
          value={enteredAmount}
          onChange={handleValueCalc}
        />
        <TextField
          required
          name="value"
          label="Value"
          variant="outlined"
          type={"number"}
          InputLabelProps={{ className: "textfield__label-modal" }}
          value={enteredValue}
          onChange={(e) => setEnteredValue(e.target.value)}
        />
      </div>
      <div className="modal-form__buttons">
        <button
          type="submit"
          className="dark-btn"
          onClick={() => onTransactionAdd()}
          disabled={!enteredCoin || !enteredAmount}
        >
          Add
        </button>
      </div>
    </form>
  );
}
