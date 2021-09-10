
import { useSelector, useDispatch } from "react-redux";
import Constants from "./Constants";

export const currencyFormatter = value => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const updateCardSpendingLimit = async (isEnabled, amount) => {

    const debitCardDetails = useSelector(
        (state) => state.ui.debitCardDetails
    )

    let updatedDetails = Object.assign({}, debitCardDetails);
    updatedDetails.weekly_limit = amount;
    updatedDetails.set_weekly_limit = isEnabled;
    const requestJson = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDetails)
    };
    try {
        const response = await fetch(Constants.API_URL, requestJson);
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}