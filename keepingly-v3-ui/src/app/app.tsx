"use client";
import { persistor, store } from "@/Redux/store";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import AppProvider from "./context";
import { AppProps } from "@/types";
import Main from "./main";

const App = ({ auth, broker, homeowner, appraiser }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <AppProvider>
            <Main
              auth={auth}
              broker={broker}
              homeowner={homeowner}
              appraiser={appraiser}
            />
            <ToastContainer />
          </AppProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
