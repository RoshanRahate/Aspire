import React, {useState, useEffect} from 'react';

export const useDebitCardDetails = () => {

    const [debitCardDetails, setDebitCardDetails] = useState({})

    useEffect(() => {
      const getDebitCardDetails = async () => {
        // setLoading(true);
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

    return {
        debitCardDetails
    }
}