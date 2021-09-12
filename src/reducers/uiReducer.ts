import { createSlice } from "@reduxjs/toolkit";

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

const initialState = {
  debitCardDetails: {
    card_number: "",
    card_type: "",
    card_holder_name: "",
    validity: "",
    cvv: "",
    max_limit: 0,
    available_balance: "",
    weekly_limit: 0,
    set_weekly_limit: false
  } as DebitCardDetails
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setCardDetails(state, action) {
      console.log("state.", action.payload)
      state.debitCardDetails = action.payload
    },
    
    updateCardDetails(state, action) {
      state.debitCardDetails = action.payload;
    }
  },
});

export const {
  setCardDetails,
  updateCardDetails
} = uiSlice.actions;

export default uiSlice.reducer;