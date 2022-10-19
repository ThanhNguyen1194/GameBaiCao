import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    newDeck: {
        deck_id: "j3up6gxzwovs",
        remaining: 52,
        shuffled: true,
        success: true,
        gambleScores: 900
    },
    player: [

        {
            name: 'userA',
            status: true,
            point: 5000,
            cards: [],
            total: 0,
            value: 0,
        },
        {
            name: 'userB',
            status: true,
            point: 5000,
            cards: [],
            total: 0,
            value: 0,
        },
        {
            name: 'userC',
            status: true,
            point: 5000,
            cards: [],
            total: 0,
            value: 0,
        },
        {
            name: 'userD',
            status: true,
            point: 5000,
            cards: [],
            total: 0,
            value: 0,
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
            console.log(action.payload)
            for (let i = 0; i < state.player.length; i++) {
                state.player[i].cards = []
            }
            const { cards, remaining } = action.payload
            state.newDeck.remaining = remaining
            for (let i = 0; i < cards.length; i++) {
                for (let j = 0; j < state.player.length; j++) {
                    if (state.player[j].status === true) {
                        state.player[j].cards.push(cards[i]);
                        i++
                    }
                }
                i--
            }
            state.player.forEach((item) => {

                const totalNumber = item.cards.reduce((total, card) => {
                    if (card.value === "ACE") {
                        total += 1;
                    } else if (card.value === "KING") {
                        total += 10;
                    } else if (card.value === "QUEEN") {
                        total += 10;
                    } else if (card.value === "JACK") {
                        total += 10;
                    } else {
                        total += parseInt(card.value);
                    }
                    // console.log("card", card);
                    return total;
                }, 0)
                item.total = totalNumber
                item.value = totalNumber % 10
            })
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
    console.log("playerNumber", playerNumber.length)
    console.log("remaining", initialState.newDeck.remaining)
    if (initialState.newDeck.remaining >= (playerNumber.length * 3)) {

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
    } else {
        alert("Không đủ số lá bài để chơi, shuffle để chơi lại")
    }
}