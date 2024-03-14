import { configureStore } from '@reduxjs/toolkit';
import productTypesReducer from './slices/index';

export const store = configureStore({
    reducer: {
        productTypes: productTypesReducer,
    },
});