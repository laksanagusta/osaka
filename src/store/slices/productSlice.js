import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';


const initialState = {
    products: []
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    }),
    reducers: {
        setProducts(state, action){
            state.products = action.payload
        },
    }
});


export const {setProducts} = productSlice.actions;
export default productSlice.reducer;