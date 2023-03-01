
import './App.css';
import 'antd/dist/reset.css';

import { Layout } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Loading from './components/Loading';
import AppRoutes from './routes';
import store from './store';

function App(){
  let persistor = persistStore(store);
  return (
    <Layout className="layout h-screen">
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    </Layout>
  );
};

export default App;
