import React, { useContext, useState } from "react";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import "./AddNewExpenceForm.css";
import { categoriesList } from "../Expences/utils.js";
import ExpenceCategoryItem from "./ExpenceCategoryItem";
import axios from "axios";
import { ExpensesContext } from "../../contexts/ExpensesContext.js";
import { useForm } from "react-hook-form";
import { fetchExpenses, isEmptyObject } from "../../utils.js";

//SCROLLING DOWN FUNCTION
let isDown = false;
let startX;
let scrollLeft;

const mouseDown = (e) => {
  isDown = true;
  const slider = document.getElementById("modal-form__category");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};

const mouseLeave = () => {
  isDown = false;
};

const mouseUp = () => {
  isDown = false;
};

const mouseMove = (e) => {
  if (!isDown) return;
  e.preventDefault();
  const slider = document.getElementById("modal-form__category");
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
};

const today = new Date().toISOString().split("T")[0];

export default function ModalForm(props) {
  const { session, setExpenses } = useContext(ExpensesContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: today,
    },
  });
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    axios
      .post("http://127.0.0.1:8000/expenses/add/", {
        Title: data.title,
        Amount: data.amount,
        Date: data.date,
        Category: category,
        User: session.id,
      })
      .then(async (response) => {
        const data = await fetchExpenses(session.id);
        setExpenses(data);
      })
      .catch((e) => console.log(e));

    setIsLoading(false);
    props.onClose();
  };

  const renderCategories = Object.values(categoriesList).map((category) => (
    <ExpenceCategoryItem
      id={category.id}
      key={category.id}
      title={category.title}
      icon={category.icon}
      color={category.color}
      setCategory={setCategory}
    />
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
      <div className="modal-form__controls">
        <Grid container columnSpacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              type={"text"}
              {...register("title", {
                required: "Title is required",
              })}
              error={!!errors?.title}
              helperText={errors?.title?.message}
              InputLabelProps={{ className: "textfield__label-modal" }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              {...register("amount", {
                required: "Amount is required",
                pattern: {
                  value: /^[+-]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number",
                },
              })}
              error={!!errors?.amount}
              helperText={errors?.amount?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">zł</InputAdornment>
                ),
              }}
              InputLabelProps={{ className: "textfield__label-modal" }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Date"
              variant="outlined"
              type={"date"}
              {...register("date", {
                required: "Date is required",
              })}
              error={!!errors?.date}
              helperText={errors?.date?.message}
              InputLabelProps={{
                className: "textfield__label-modal",
              }}
            />
          </Grid>
        </Grid>
      </div>
      <div
        className="modal-form__category"
        id="modal-form__category"
        onMouseDown={mouseDown}
        onMouseLeave={mouseLeave}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      >
        {renderCategories}
      </div>
      <div className="modal-form__buttons">
        <Button
          type="submit"
          variant="contained"
          sx={{ height: "50px" }}
          disabled={isLoading || !isEmptyObject(errors)}
        >
          Add expense
        </Button>
      </div>
    </form>
  );
}
