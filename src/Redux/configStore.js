import { configureStore } from '@reduxjs/toolkit'
import gameBaiCaoReducer from './reducer/gameBaiCaoReducer'

export const store = configureStore({
    reducer: {
        gameBaiCaoReducer: gameBaiCaoReducer
    }
})