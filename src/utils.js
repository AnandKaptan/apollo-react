import axios from "axios";

const convertPrice = async (originalCurrency, newCurrency, amount) => {
  if (originalCurrency === newCurrency) return amount;

  const { data } = await axios.get(
    `https://api.exchangeratesapi.io/latest?symbols=${newCurrency}&base=${originalCurrency}`
  );
  const conversionRate = Object.values(data.rates)[0];

  return amount * conversionRate;
};
export default convertPrice;
