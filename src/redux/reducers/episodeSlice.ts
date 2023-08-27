import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const episodeSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    addEpisodes: (state, action: PayloadAction) => {
      state = state.concat(action.payload);
    },
  },
});
export const { addEpisodes } = episodeSlice.actions;
export default episodeSlice.reducer;
