import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface AnalysisPokemon {
  id: number
  name: string
  image: string
  height: number
  weight: number
  types: string[]
}

interface AnalysisState {
  list: AnalysisPokemon[]
}

const initialState: AnalysisState = { list: [] }

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    addPokemon(state, action: PayloadAction<AnalysisPokemon>) {
      if (state.list.length >= 4) return
      if (state.list.find((p) => p.id === action.payload.id)) return
      state.list.push(action.payload)
    },
    removePokemon(state, action: PayloadAction<number>) {
      state.list = state.list.filter((p) => p.id !== action.payload)
    },
  },
})

export const { addPokemon, removePokemon } = analysisSlice.actions
export default analysisSlice.reducer
