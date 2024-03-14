import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    productTypes: [],
};

export const productTypesSlice = createSlice({
    name: 'productTypes',
    initialState: initialState,
    reducers: {
        setProductTypes(state, action) {
            state.productTypes = action.payload;
        },
    },
});

export const { setProductTypes } = productTypesSlice.actions;
export default productTypesSlice.reducer;