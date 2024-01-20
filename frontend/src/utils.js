import axios from "axios";

export const isEmptyObject = (object) => {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export const fetchExpenses = async (userId) => {
  const data = await axios
    .get(`http://127.0.0.1:8000/expenses/user/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.log(e));

  return data;
};
