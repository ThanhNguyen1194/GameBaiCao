import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {

}

const gameBaiCaoReducer = createSlice({
    name: 'gamBaiCaoReducer',
    initialState,
    reducers: {
        getNewDeckApiReducer: (state, action) => {
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

export const { getNewDeckApiReducer, addToCartAction } = gameBaiCaoReducer.actions

export default gameBaiCaoReducer.reducer

//------------------ action thunk ------------
export const getAllProductApi = () => {

    return async (dispatch, getState) => {

        try {
            const result = await axios({
                url: 'https://shop.cyberlearn.vn/api/Product',
                method: 'GET'
            });
            //Xử lý dispatch lên reducer
            // dispatch({
            //     type:'shopReducer/getProductApi',
            //     data:result.data.content
            // })
            const action = getNewDeckApiReducer(result.data.content);
            dispatch(action);
            // action = {
            //     type: 'shopReducer/getProductApiAction',
            //     payload: result.data.content
            // }

        } catch (err) {
            console.log(err)
        }

    }
}