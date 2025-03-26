import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { AlertProvider } from "../components/provider/AlertProvider";

import rapport from "../reducers/rapport";
import users from "../reducers/users";

import { useRouter } from 'next/router';

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({ users, rapport });
const persistConfig = { key: "inStore", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {

  const router = useRouter();
  const after = (router.pathname === "/nouveau-rapport" || router.pathname === "/modifier-rapport") ? "after:mb-8" : "";

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AlertProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta name="robots" content="noindex, nofollow" />
            <title>IntervenApp</title>
          </Head>
          <div className={`w-[96vw] m-auto flex flex-col ${after}`}>
            <Component {...pageProps} />
          </div>
        </AlertProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
