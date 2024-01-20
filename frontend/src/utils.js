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

export function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.4)"
    );
  }
  throw new Error("Bad Hex");
}
