import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './slices/AuthSlice';

const persistConfig = {
  key: "thesis-app",
  storage,
  version: 1,
  // whitelist: [],
};

const rootReducer = combineReducers({
  auth,
});

export function makeStore() {
  return configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}

const store = makeStore();


export default store;
