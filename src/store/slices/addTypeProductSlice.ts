import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payload } from '../../pages/create';

interface ProductType {
    id: string;
    data: Payload;
}

interface ProductTypesState {
    productTypes: ProductType[];
}

const initialState: ProductTypesState = {
    productTypes: []
}

export const productTypesSlice = createSlice({
    name: 'productTypes',
    initialState,
    reducers: {
        addProductType: (state, action: PayloadAction<Payload>) => {
            state.productTypes.push({ id: generateId(), data: action.payload });
        },
        updateProductType: (state, action: PayloadAction<{ id: string, updatedProductType: Payload }>) => {
            const { id, updatedProductType } = action.payload;
            const index = state.productTypes.findIndex(productType => productType.id === id);
            if (index !== -1) {
                state.productTypes[index].data = updatedProductType;
            }
        },
        deleteProductType: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            state.productTypes = state.productTypes.filter(productType => productType.id !== idToDelete);
        }
    }
});

export const { addProductType, updateProductType, deleteProductType } = productTypesSlice.actions;

export default productTypesSlice.reducer;

const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};