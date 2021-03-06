/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./src/reducers";
import { RootNavigator } from './src/navigator/RootNavigator';

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>


const App: () => JSX.Element = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
