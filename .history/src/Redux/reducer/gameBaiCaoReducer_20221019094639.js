import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    gambleScores: 900,
    newDeck: {
        deck_id: "j3up6gxzwovs",
        remaining: 0,
    },
    player: [

        {
            name: 'userA',
            status: true,
            point: 5000,
            cards: [],
            total: 0,
            value: 0,
            show: false
        },
        {
            name: 'userB',
            status: true,
            point: 5000,
            cards: [],
            total: 0,
            value: 0,
            show: false

        },
        {
            name: 'userC',
            status: true,
            point: 5000,
            cards: [],
            total: 0,
            value: 0,
            show: false

        },
        {
            name: 'userD',
            status: true,
            point: 5000,
            cards: [],
            total: 0,
            value: 0,
            show: false

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
            for (let i = 0; i < state.player.length; i++) {
                state.player[i].cards = []
            }
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
                        state.player[j].show = false
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
        },
        revealCard: (state, action) => {
            let listScores = []
            const maxScore = 0
            for (let i = 0; i < state.player.length; i++) {
                if (state.player[i].status === true) {
                    state.player[i].show = true
                    listScores.push(state.player[i].value)
                }

            }
            maxScore = Math.max(listScores)
            console.log("listScores", listScores)
            console.log("maxScores", maxScore)
        }

    }
});

export const { getNewDeckApiAction, playerCard, revealCard } = gameBaiCaoReducer.actions

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
export const drawCardApi = (deck_id, playerNumber) => {




    return async (dispatch) => {

        try {
            const result = await axios({
                url: `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${playerNumber * 3}`,
                method: 'GET'
            });

            const action = playerCard(result.data);
            dispatch(action);


        } catch (err) {
            console.log(err)
        }

    }

}