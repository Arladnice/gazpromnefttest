import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
    reducer: {
        data: dataReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
