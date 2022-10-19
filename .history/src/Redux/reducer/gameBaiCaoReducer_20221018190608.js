import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {

}

const gameBaiCaoReducer = createSlice({
    name: 'gamBaiCaoReducer',
    initialState,
    reducers: {
        getProductApiAction: (state, action) => {
            console.log(action);
            state.dataProduct = action.payload;
        },
        addToCartAction: (state, action) => {
            // console.log('action',action);
            const itemCart = state.cart.find(item => item.id === action.payload.id);
            if (itemCart) {
                itemCart.quantity += 1;
            } else {
                state.cart.push(action.payload);
            }
        },
    }
});

export const { getProductApiAction, addToCartAction } = gameBaiCaoReducer.actions

export default gameBaiCaoReducer.reducer