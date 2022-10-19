import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initPoint = 5000

const initialState = {
    gambleScores: 900,
    newDeck: {
        deck_id: "",
        remaining: 0,
    },
    player: [

        {
            name: 'userA',
            status: true,
            point: initPoint,
            cards: [],
            total: null,
            value: null,
            show: false,
            win: null
        },
        {
            name: 'userB',
            status: true,
            point: initPoint,
            cards: [],
            total: null,
            value: null,
            show: false,
            win: null


        },
        {
            name: 'userC',
            status: true,
            point: initPoint,
            cards: [],
            total: null,
            value: null,
            show: false,
            win: null


        },
        {
            name: 'userD',
            status: true,
            point: initPoint,
            cards: [],
            total: 0,
            value: null,
            show: false,
            win: null


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
                state.player[i].win = null
                state.player[i].total = null
            }
        },
        playerCard: (state, action) => {
            // console.log(action.payload)
            const listPlayerAcctive = state.player.filter((player) =>
                player.status === true
            )
            if (listPlayerAcctive.length > 1) {

                for (let i = 0; i < state.player.length; i++) {
                    state.player[i].cards = []
                    if (state.player[i].status === true) {
                        state.player[i].point -= initialState.gambleScores
                    }
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
                        return total;
                    }, 0)
                    item.win = null
                    if (item.status === true) {

                        item.total = totalNumber
                    } else {
                        item.total = null
                    }
                    item.value = totalNumber % 10
                    let prioritized = 0;
                    item.cards.forEach((card) => {
                        if (card.value === "KING") {
                            prioritized += 1
                        } else if (card.value === "QUEEN") {
                            prioritized += 1
                        } else if (card.value === "JACK") {
                            prioritized += 1
                        }
                    })
                    if (prioritized === 3) {
                        item.value = 10
                    }
                })
            } else {
                state.player.forEach((item) => {
                    item.cards = []
                    item.total = ""
                })
                alert("Không đủ số người chơi")
            }
        },
        revealCard: (state, action) => {
            const { player } = state
            let maxScore = 0
            for (let i = 0; i < player.length; i++) {
                if (player[i].status === true) {
                    player[i].show = true
                }
                if (player[i].value > maxScore) {
                    maxScore = player[i].value
                }

            }
            const listMaxScorePlayer = player.filter((player) => player.value === maxScore)
            const listLosePlayer = player.filter((player) => player.value !== maxScore && player.status === true)
            const listPlayerAcctive = player.filter((player) =>
                player.status === true
            )

            if (listPlayerAcctive.length > 1) {

                player.forEach((player) => {
                    listMaxScorePlayer.forEach((maxScorePlayer) => {
                        if (maxScorePlayer.name === player.name) {
                            player.win = true
                            player.point += parseInt((initialState.gambleScores * listLosePlayer.length) / listMaxScorePlayer.length) + initialState.gambleScores
                            return
                        } else if (player.status === true) {
                            player.win = false
                        }
                    })
                    if (player.point < initialState.gambleScores) {
                        player.status = false

                    }
                    player.value = null
                })
            }
        },

        resetCard: (state, action) => {
            state.newDeck.remaining = 0
            state.player.forEach((player) => {
                player.point = initPoint
                player.cards = []
                player.status = true
                player.total = null
                player.value = null
                player.win = null
            })
        }

    }
});

export const { getNewDeckApiAction, playerCard, revealCard, resetCard } = gameBaiCaoReducer.actions

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