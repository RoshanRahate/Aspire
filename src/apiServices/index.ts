import Constants from '../utility/Constants';

/**
 * To update the spending limit
 * @param debitCardDetails - current debit card details
 * @param isEnabled - set spending limit value
 * @param amount - amount value
 * @returns updated debit card json
 */
export const updateCardSpendingLimit = async (
  debitCardDetails,
  isEnabled,
  amount,
) => {
  let updatedDetails = {...debitCardDetails};
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

/**
 * Get the debit card details from the fetch call
 * @returns debit card json
 */
export const getDebitCardDetails = async () => {
  try {
    const result = await fetch(Constants.API_URL);
    return await result.json();
  } catch (error) {
    throw new Error(error);
  }
};
