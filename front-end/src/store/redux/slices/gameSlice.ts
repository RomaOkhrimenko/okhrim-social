import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
    filterData: {
        gameId: string,
        userId: string,
        gender: string
    }
}

const initialState: IInitialState = {
    filterData: {
        gameId: '',
        userId: '',
        gender: ''
    }
}


const gameSlice = createSlice({
    name: 'Game',
    initialState,
    reducers: {
        setFilterData(state: IInitialState, action: PayloadAction<{gameId: string, userId: string, gender: string}>) {
            state.filterData = action.payload
        }
    }
})

export const {setFilterData} = gameSlice.actions
export const gameReducer = gameSlice.reducer