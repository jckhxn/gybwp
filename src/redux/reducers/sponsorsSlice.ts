import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = Array;

export const sponsorSlice = createSlice({
  name: "sponsors",
  initialState,
  reducers: {
    addSponsors: (state, action: PayloadAction) => {
      return action.payload;
    },
  },
});
export const { addSponsors } = sponsorSlice.actions;
export default sponsorSlice.reducer;
