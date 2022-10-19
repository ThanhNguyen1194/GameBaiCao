import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    newDeck: {
        deck_id: "exunv3xcp7e6",
        remaining: 52,
        shuffled: true,
        success: true
    },
    player: [

        {
            name: 'userA',
            status: false,
            point: 5000,
            cards: []
        },
        {
            name: 'userB',
            status: true,
            point: 5000,
            cards: []
        },
        {
            name: 'userC',
            status: true,
            point: 5000,
            cards: []
        },
        {
            name: 'userD',
            status: true,
            point: 5000,
            cards: []
        }
    ]
}

const gameBaiCaoReducer = createSlice({
    name: 'gamBaiCaoReducer',
    initialState,
    reducers: {
        getNewDeckApiAction: (state, action) => {
            // console.log(action);
            state.newDeck = action.payload;

        },
        playerCard: (state, action) => {
            console.log(action)
            for (let i = 0; i < state.player.length; i++) {

            }
            const { cards, remaining } = action.payload
            state.newDeck.remaining = remaining
            for (let i = 0; i < cards.length; i++) {
                for (let j = 0; j < state.player.length; j++) {
                    if (state.player[j].status === true) {
                        state.player[j].cards.push(cards[i])
                        i++
                    }
                }
                i--
            }
        }

    }
});

export const { getNewDeckApiAction, playerCard } = gameBaiCaoReducer.actions

export default gameBaiCaoReducer.reducer

//------------------ action thunk ------------
export const getNewDeckApi = () => {

    return async (dispatch) => {

        try {
            const result = await axios({
                url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
                method: 'GET'
            });

            const action = getNewDeckApiAction(result.data);
            dispatch(action);


        } catch (err) {
            console.log(err)
        }

    }
}
export const drawCardApi = (deck_id) => {
    const playerNumber = initialState.player.filter((player) => player.status === true)
    return async (dispatch) => {

        try {
            const result = await axios({
                url: `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${playerNumber.length * 3}`,
                method: 'GET'
            });

            const action = playerCard(result.data);
            dispatch(action);


        } catch (err) {
            console.log(err)
        }

    }
}