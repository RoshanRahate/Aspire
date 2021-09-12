export default {
  API_URL: 'http://localhost:3000/debit_card',

  suggestedLimits: [5000, 10000, 20000],

  //String constants
  check_network_connection:
    'Something went wrong. Kindly check your network connection and try again.',
  //Debit Card screen
  debit_card_label: 'Debit Card',
  available_balance: 'Available balance',
  show_card_number: 'Show card number',
  hide_card_number: 'Hide card number',
  debit_card_spending_limit: 'Debit card spending limit',
  top_up_account: 'Top-up account',
  deposit_money_to_your_account:
    'Deposit money to your account to use with card',
  weekly_spending_limit: 'Weekly spending limit',
  you_havent_set_limit: 'You haven’t set any spending limit on card',
  get_a_new_card: 'Get a new card',
  this_deactivates_your_debit_card: 'This deactivates your current debit card',
  deactivated_cards: 'Deactivated Cards',
  your_previously_deactivated_cards: 'Your previously deactivated cards',
  freeze_cards: 'Freeze Card',
  your_card_is_currently_active: 'Your debit card is currently active',

  //Spending Limit Screen
  spending_limit_title: 'Spending Limit',
  set_weekly_debit_limit: 'Set a weekly debit card spending limit',
  here_weekly_means_text:
    'Here weekly means the last 7 days - not the calendar week',
  save_button_title: 'SAVE',
  currency: 'S$',
  enter_valid_spending_limit: 'Enter valid spending limit',
};

export enum AVAILABLE_ROUTES {
  DEBIT_CARD = 'Debit Card',
  SPENDING_LIMIT_SCREEN = 'Spending Limit Screen',
  PROFILE = 'Profile',
  HOME = 'Home',
}
