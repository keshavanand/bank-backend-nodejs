import instance from "../axios/axiosInstance.js";

const exchange = async (amount, fromCurrency, toCurrency) => {
  const fxRate = await getFxRate(fromCurrency, toCurrency);
  return amount * fxRate;
};

const getFxRate = async (fromCurrency, toCurrency) => {
  const response = await instance.get("", {
    params: {
      symbols: toCurrency,
      base: fromCurrency
    },
  });

  const rate = response.data.rates[toCurrency];
  return Number(rate);
};

const currencyService = { exchange };
export default currencyService;
