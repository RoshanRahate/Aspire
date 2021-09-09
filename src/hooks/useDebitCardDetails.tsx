import React, { useState, useEffect } from 'react';

export const useDebitCardDetails = () => {

  const [debitCardDetails, setDebitCardDetails] = useState({});
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const getDebitCardDetails = async () => {
      try {
        const result = await fetch("http://localhost:3000/debit_card");
        const cardDetails = await result.json();
        console.log(result)
        setDebitCardDetails(cardDetails);
      } catch (error) {
        console.log(error);
      }
    };

    getDebitCardDetails();
  }, []);

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
      const response = await fetch('http://localhost:3000/debit_card', requestJson);
      const cardDetails = await response.json();
      setDebitCardDetails(cardDetails);
    } catch (error) {
      console.log(error);
    }
  }
  return {
    debitCardDetails,
    updateSpendingLimit, 
  }
}