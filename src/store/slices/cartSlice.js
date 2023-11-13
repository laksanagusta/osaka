import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';


const initialState = {
    isCartOpen: false,
    basket: [],
    isLoading: false,
    subTotal: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    }),
    reducers: {
        toggleCart(state, action) {
            state.isCartOpen = action.payload;
        },
        setBasket(state, action){
            state.basket = action.payload
        },
        setIsLoading(state, action){
            state.isLoading = action.payload
        },
        addItem(state, action) {
            const newItemId = action.payload.id;
            const existingItem = state.basket.cartItems.find(item => item.id === newItemId);

            if (existingItem) {
                existingItem.qty++;
                existingItem.subTotal = action.payload.unitPrice * existingItem.qty;
            } else {
                action.payload.productId = action.payload.product.id;
                action.payload.qty = 1;
                action.payload.subTotal = action.payload.product.unitPrice;
                state.basket.push(action.payload);
            }
        },
        removeItem(state, action) {
            state.basket.cartItems = state.basket.cartItems.filter(item => item.id !== action.payload);
        },
        incrementItem(state, action) {
            state.basket.cartItems = state.basket.cartItems.map(item => {
                if (item.id === action.payload.itemId) {
                    item.qty++;
                    item.subTotal = item.qty * item.unitPrice;
                }
                return item;
            });
        },
        decrementItem(state, action) {
            state.basket.cartItems = state.basket.cartItems.map(item => {
                if (item.id === action.payload.itemId) {
                    item.qty--;
                    item.subTotal = item.qty * item.unitPrice;
                }
                return item;
            }).filter(item => item.qty !== 0);
        },
        clearItem(state, action) {
            state.basket.cartItems = []
        }
    }
});


export const {setBasket, setIsLoading, toggleCart, addItem, removeItem, incrementItem, decrementItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;