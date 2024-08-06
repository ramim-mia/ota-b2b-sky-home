import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slice/userSlice';
import settingReducer from './slice/settingsSlice';
import { api } from './api/api';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

// const persistedReducer = persistReducer(persistConfig, usersReducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: usersReducer,
    setting: settingReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
