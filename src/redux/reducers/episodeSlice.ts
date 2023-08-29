import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = Array;

export const episodeSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    addEpisodes: (state, action: PayloadAction) => {
      return action.payload;
    },
  },
});
export const { addEpisodes } = episodeSlice.actions;
export default episodeSlice.reducer;
