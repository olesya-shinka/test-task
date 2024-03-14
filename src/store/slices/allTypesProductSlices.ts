import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductSchema } from '../../pages/main/index';

interface ProductTypesState {
    productTypes: ProductSchema[];
}

const initialState: ProductTypesState = {
    productTypes: [],
};

export const productTypesSlice = createSlice({
    name: 'productTypes',
    initialState,
    reducers: {
        setProductTypes: (state, action: PayloadAction<ProductSchema[]>) => {
            state.productTypes = action.payload;
        },
    },
});

export const { setProductTypes } = productTypesSlice.actions;

export default productTypesSlice.reducer;