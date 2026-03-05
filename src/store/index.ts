import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; //geri dönüs tipim RootState
export type AppDispatch = typeof store.dispatch; //dispatch func tipi
