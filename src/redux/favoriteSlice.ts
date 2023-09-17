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
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
