import React, { useState, useEffect } from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";
import "./AddNewCryptoForm.css";
import { Controller, useForm } from "react-hook-form";
import { isEmptyObject } from "../../utils";

export default function AddNewCryptoForm({
  crypto,
  onTransactionAdd,
  onClose,
}) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const cryptoOptions = crypto.map((coin) => ({
    label: coin.symbol.toUpperCase(),
  }));
  const watchAmount = watch("amount");

  //HANDLE FORM SUBMIT
  const onSubmit = async (data) => {
    console.log(data);
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

  // const handleValueCalc = (e) => {
  //   setEnteredAmount(e.target.value);
  //   if (enteredCoin) {
  //     const coin = crypto.find((v) => v.symbol === enteredCoin.toLowerCase());
  //     const currentValue = (coin.current_price * e.target.value).toFixed(2);
  //     setEnteredValue(currentValue);
  //   }
  // };

  // const handleCoinChange = (e) => {
  //   setEnteredCoin(e.target.innerHTML);
  //   setEnteredAmount("");
  //   setEnteredValue("");
  // };

  // useEffect(() => {
  //   if (!watchAmount) setValue("value", null);

  // }, [watchAmount]);

  return (
    <form className="crypto-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="crypto-form-controls">
        <Grid container columnSpacing={2}>
          <Grid item xs={4}>
            <Controller
              control={control}
              name="coin"
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  required
                  disablePortal
                  id="combo-box-demo"
                  options={cryptoOptions || []}
                  onChange={(e) => console.log(e.target.value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Crypto" />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              type={"number"}
              InputLabelProps={{ className: "textfield__label-modal" }}
              {...register("amount", {
                required: "Amount is required",
              })}
              error={!!errors?.amount}
              helperText={errors?.amount?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Value"
              variant="outlined"
              type={"number"}
              InputLabelProps={{ className: "textfield__label-modal" }}
              {...register("value", {
                required: "Value is required",
              })}
              error={!!errors?.value}
              helperText={errors?.value?.message}
            />
          </Grid>
        </Grid>
      </div>
      <div className="modal-form__buttons">
        <button
          type="submit"
          className="dark-btn"
          disabled={!isEmptyObject(errors) || isLoading}
        >
          Add transaction
        </button>
      </div>
    </form>
  );
}
