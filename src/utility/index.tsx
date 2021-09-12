import Constants from './Constants';

export const currencyFormatter = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const updateCardSpendingLimit = async (
  debitCardDetails,
  isEnabled,
  amount,
) => {
  let updatedDetails = Object.assign({}, debitCardDetails);
  updatedDetails.weekly_limit = amount;
  updatedDetails.set_weekly_limit = isEnabled;
  const requestJson = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updatedDetails),
  };
  try {
    const response = await fetch(Constants.API_URL, requestJson);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const getDebitCardDetails = async () => {
  try {
    const result = await fetch(Constants.API_URL);
    return await result.json();
  } catch (error) {
    throw new Error(error);
  }
};
