# Aspire

## Objective
This app contains Debit Card Details screen and Spending Limits screen to change the debit card weekly spending limit

## User Stories

### Debit Card Screen 

Debit Card screen should show the Debit card details for the user. Available balance should be displayed on the screen.
For Debit Card details User can Hide/Show the card number and CVV using the Hide/Show card Number.

Debit Card spending Limit and max limit should be displayed with progress bar when user enables the Weekly spending limit. 

### Set Weekly Spending Limit

When Enabled the Weekly Spending limit on Debit card screen, User should navigate to Spending Limit screen when he/she can set the Weekly spending limit.

Auto suggested spending limits will be populated to select the spending limit. User can also enter the weekly limit amount manually.

On SAVE button user should navigate to the Debit card screen. Updated spending limit should be displayed on Debit Card screen. 

## Steps to Build Project 

- Clone the project repository main branch.
- Go to root directory -```$cd AspireTest```
- Install dependencies - ```$ yarn``` 
- This project uses mock JSON server to provide the mock Debit card JSON response, App fetches debit card data from ```mocks/debit_card_data.json``` file.
    1. Go to root directory ```cd AspireTest/```
    2. Start JSON server ```$ yarn start:mock-server```
- To build on iOS
    1. Go to iOS directory ```$cd iOS/```
    2. Install Pods - ```$pod install``` 
    3. Open ```AspireTest.xcworkspace``` in Xcode
    4. Build and Run project
- To build on Android 
    1. Go to root directory ```cd AspireTest/```
    2. Start package manger ```$ yarn start```
    2. ```$react-native run-android```

## Pending Tasks

    - Update the styling to make theme compatible
    - Unit tests are pending 
