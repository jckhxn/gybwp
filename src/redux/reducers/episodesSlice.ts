import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = [
  {
    value: AuthState;
  }
];
type AuthState = {
  isAuth: Boolean;
  username: String;
  uuid: String;
  isMod: Boolean;
};
const initialState = [
  {
    value: {
      isAuth: false,
      username: "",
      uuid: "",
      isMod: false,
    } as AuthState,
  },
] as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    login: (state, action: PayloadAction<string>) => {
      return [
        {
          value: {
            isAuth: true,
            username: action.payload,
            uuid: "123456789",
            isMod: false,
          },
        },
      ];
    },
  },
});
export const { login, logOut } = auth.actions;
export default auth.reducer;
