import { configureStore } from '@reduxjs/toolkit';
import productTypesReducer from './slices/allTypesProductSlices';
import newProductTypeReducer from './slices/addTypeProductSlice';

export const store = configureStore({
    reducer: {
        productTypes: productTypesReducer,
        actionsProduct: newProductTypeReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;