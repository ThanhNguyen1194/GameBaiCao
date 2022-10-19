import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    newDeck: {}
}

const gameBaiCaoReducer = createSlice({
    name: 'gamBaiCaoReducer',
    initialState,
    reducers: {
        getNewDeckApiAction: (state, action) => {
            console.log(action);
            state.newDeck = action.payload;
        },
        // addToCartAction: (state, action) => {
        //     // console.log('action',action);
        //     const itemCart = state.cart.find(item => item.id === action.payload.id);
        //     if (itemCart) {
        //         itemCart.quantity += 1;
        //     } else {
        //         state.cart.push(action.payload);
        //     }
        // },
    }
});

export const { getNewDeckApiAction, addToCartAction } = gameBaiCaoReducer.actions

export default gameBaiCaoReducer.reducer

//------------------ action thunk ------------
export const getNewDeckApi = () => {

    return async (dispatch) => {

        try {
            const result = await axios({
                url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
                method: 'GET'
            });
            //Xử lý dispatch lên reducer
            // dispatch({
            //     type:'gamBaiCaoReducer/getNewDeckApiAction',
            //     data:result.data.content
            // })
            const action = getNewDeckApiAction(result);
            dispatch(action);
            // action = {
            //     type: 'gamBaiCaoReducer/getNewDeckApiAction',
            //     payload: result.data.content
            // }

        } catch (err) {
            console.log(err)
        }

    }
}