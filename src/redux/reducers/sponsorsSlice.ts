import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = Array;

export const episodeSlice = createSlice({
  name: "sponsors",
  initialState,
  reducers: {
    addSponsors: (state, action: PayloadAction) => {
      return action.payload;
    },
  },
});
export const { addSponsors } = episodeSlice.actions;
export default episodeSlice.reducer;
