import React, { useState, useEffect } from 'react';
import Constants from '../utility/Constants';
import { setCardDetails } from '../reducers/uiReducer';
import { useSelector, useDispatch } from "react-redux";

interface DebitCardDetails {
  card_number?: String,
    card_type?: String,
    card_holder_name?: String,
    validity?: String,
    cvv?: String,
    max_limit?: number,
    available_balance?: String,
    weekly_limit?: number,
  set_weekly_limit?: Boolean
}

export const useDebitCardDetails = () => {

  const dispatch = useDispatch();
  const [debitCardDetails, setDebitCardDetails] = useState<DebitCardDetails>({});

  const updateSpendingLimit = async (isEnabled, amount) => {
    let updatedDetails = debitCardDetails;
    updatedDetails.weekly_limit = amount;
    updatedDetails.set_weekly_limit = isEnabled;
    const requestJson = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDetails)
    };
    try {
      const response = await fetch(Constants.API_URL, requestJson);
      const cardDetails = await response.json();
      dispatch(setCardDetails(cardDetails))
    } catch (error) {
      console.log(error);
    }
  }
  return {
    debitCardDetails,
    updateSpendingLimit, 
  }
}