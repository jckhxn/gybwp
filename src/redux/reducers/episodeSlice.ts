import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = { episodes: [] };

export const episodeSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    addEpisodes: (state, action: PayloadAction) => {
      return {
        ...state,
        episodes: action.payload,
      };
    },
  },
});
export const { addEpisodes } = episodeSlice.actions;
export default episodeSlice.reducer;
