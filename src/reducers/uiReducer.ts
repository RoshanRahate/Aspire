import {createSlice} from '@reduxjs/toolkit';

interface DebitCardDetails {
  card_number: String;
  card_type: String;
  card_holder_name: String;
  validity: String;
  cvv: String;
  max_limit: number;
  available_balance: String;
  weekly_limit: number;
  set_weekly_limit: Boolean;
}

const initialState: DebitCardDetails = {
  card_number: '',
  card_type: '',
  card_holder_name: '',
  validity: '',
  cvv: '',
  max_limit: 0,
  available_balance: '',
  weekly_limit: 0,
  set_weekly_limit: false,
};

const uiSlice = createSlice({
  name: 'debitCardDetails',
  initialState: initialState,
  reducers: {
    setCardDetails(state, action) {
      state = action.payload;
      return state;
    },
    updateCardDetails(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const {setCardDetails, updateCardDetails} = uiSlice.actions;

export default uiSlice.reducer;
