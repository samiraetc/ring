// store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;