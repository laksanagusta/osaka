import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isCartOpen: false,
    cartItems: [],
    subTotal: 0
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart(state, action) {
            state.isCartOpen = action.payload;
        },
        addItem(state, action) {
            const newItemId = action.payload.id;
            const existingItem = state.cartItems.find(item => item.id === newItemId);

            if (existingItem) {
                existingItem.qty++;
            } else {
                action.payload.qty = 1;
                state.cartItems.push(action.payload);
            }

            state.subTotal = recalculateSubTotal(state.cartItems);
        },
        removeItem(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        incrementItem(state, action) {
            state.cartItems = state.cartItems.map(item => {
                if (item.id === action.payload) {
                    item.qty++;
                }
                return item;
            });

            state.subTotal = recalculateSubTotal(state.cartItems)
        },
        decrementItem(state, action) {
            state.cartItems = state.cartItems.map(item => {
                if (item.id === action.payload) {
                    item.qty--;
                }
                return item;
            }).filter(item => item.qty !== 0);

            state.subTotal = recalculateSubTotal(state.cartItems)
        }
    }
});

function recalculateSubTotal(items){
    let subTotal = 0;
    items.map(item => {
        subTotal += (item.qty*item.unitPrice)
    })

    return subTotal;
}


export const { toggleCart, addItem, removeItem, incrementItem, decrementItem } = cartSlice.actions;
export default cartSlice.reducer;