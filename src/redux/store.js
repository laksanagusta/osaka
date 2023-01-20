import {configureStore} from '@reduxjs/toolkit';

const initBasket = {
    numberCart:0,
    Basket:[]    
}

const reducer = (state = initBasket, action) => {
    switch(action.type){
        case 'UPDATE_BASKET':
            if(!initBasket.length){
                let newBasket = {
                    id: action.payload.id,
                    code: action.payload.code,
                    title: action.payload.title,
                    price: action.payload.price,
                    qty: action.payload.qty
                }
                state.Basket.push(newBasket)
            }else{
                const index = item.findIndex(x => x.code === action.payload.code);
                state.Basket[index].qty+=1

                return {
                    ...state
                }
            }
    }

    return state;
}

const store = configureStore(reducer)

export default store;