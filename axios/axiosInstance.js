import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const instance = axios.create({
  baseURL: "https://api.currencyfreaks.com/v2.0/rates/latest",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    // eslint-disable-next-line no-undef
    apikey: process.env.CURRENCY_EXCHANGE_API,
  },
});

export default instance;
