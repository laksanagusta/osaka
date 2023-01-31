import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isCartOpen: false,
    basket: [],
    subTotal: 0
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }),
    reducers: {
        toggleCart(state, action) {
            state.isCartOpen = action.payload;
        },
        addItem(state, action) {
            const newItemId = action.payload.id;
            const existingItem = state.basket.find(item => item.id === newItemId);

            if (existingItem) {
                existingItem.qty++;
                existingItem.subTotal = action.payload.unitPrice * existingItem.qty; 
            } else {
                action.payload.productId = action.payload.id;
                action.payload.qty = 1;
                action.payload.subTotal = action.payload.unitPrice;
                state.basket.push(action.payload);
            }

            state.subTotal = recalculateSubTotal(state.basket);
        },
        removeItem(state, action) {
            state.basket = state.basket.filter(item => item.id !== action.payload);
        },
        incrementItem(state, action) {
            state.basket = state.basket.map(item => {
                if (item.id === action.payload) {
                    item.qty++;
                    item.subTotal = item.qty * item.unitPrice;
                }
                return item;
            });

            state.subTotal = recalculateSubTotal(state.basket)
        },
        decrementItem(state, action) {
            state.basket = state.basket.map(item => {
                if (item.id === action.payload) {
                    item.qty--;
                    item.subTotal = item.qty * item.unitPrice;
                }
                return item;
            }).filter(item => item.qty !== 0);

            state.subTotal = recalculateSubTotal(state.basket)
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