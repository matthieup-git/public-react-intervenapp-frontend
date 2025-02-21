import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rapport from '../reducers/rapport';
import users from '../reducers/users'

const store = configureStore({
  reducer: { rapport, users },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store} >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IntervenApp</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
