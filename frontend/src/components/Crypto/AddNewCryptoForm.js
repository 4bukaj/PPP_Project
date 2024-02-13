import React, { useState, useEffect, useContext } from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";
import "./AddNewCryptoForm.css";
import { Controller, useForm } from "react-hook-form";
import { isEmptyObject } from "../../utils";
import { ExpensesContext } from "../../contexts/ExpensesContext";
import axios from "axios";

export default function AddNewCryptoForm({
  crypto,
  onTransactionAdd,
  onClose,
  setCrypto,
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
  const { session } = useContext(ExpensesContext);
  const cryptoOptions = crypto.map((coin) => ({
    label: coin.symbol.toUpperCase(),
  }));
  const watchCoin = watch("coin");
  const watchAmount = watch("amount");

  //HANDLE FORM SUBMIT
  const onSubmit = async (data) => {
    const ImageUrl = crypto.find(
      (coin) => coin.symbol === data.coin.toLowerCase()
    ).image;

    const formData = {
      Coin: data.coin,
      Amount: data.amount,
      Worth: data.value.toFixed(2),
      UserID: session.id,
      ImageUrl,
    };
    console.log(formData);
    axios
      .post("http://127.0.0.1:8000/kryptos/add/", formData)
      .then((res) =>
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
            onClose();
          })
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!watchCoin) return;
    if (!watchAmount) setValue("value", null);

    const coinValue = crypto.find(
      (coin) => coin.symbol === watchCoin.toLowerCase()
    )?.current_price;
    const value = coinValue * watchAmount;

    setValue("value", value);
  }, [watchAmount, watchCoin]);

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
                  onChange={(e, data) => onChange(data.label)}
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
              InputLabelProps={{ className: "textfield__label-modal" }}
              {...register("amount", {
                required: "Amount is required",
                pattern: {
                  value: /^[+-]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number",
                },
              })}
              error={!!errors?.amount}
              helperText={errors?.amount?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="value"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ? field.value.toFixed(2) : ""}
                  label="Value"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: !!field.value,
                    className: "textfield__label-modal",
                  }}
                />
              )}
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
