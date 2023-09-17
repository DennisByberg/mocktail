import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../helpers/localStorage";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFromLocalStorage<string[]>("favorites") || [],
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
      saveToLocalStorage("favorites", state);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const filteredState = state.filter((id) => id !== action.payload);
      saveToLocalStorage("favorites", filteredState);
      return filteredState;
    },
    clearFavorites: (state) => {
      state = []; // Set the state to an empty array
      saveToLocalStorage("favorites", state);
      return state;
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
