"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import RouteChangeLoader from "../components/layout/RouteChangeLoader";
import { persistor, store } from "../Redux/store";
import { ThemeProvider } from "../theme/ThemeProvider";

export const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                    <RouteChangeLoader>
                        {children}
                    </RouteChangeLoader>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};