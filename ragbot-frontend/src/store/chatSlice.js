import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active_session_id: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSessionId(state, action) {
      state.active_session_id = action.payload;
    },
  },
});

export const selectActiveSessionId = (state) =>
  state.chat.active_session_id;

export const {
  setSessionId,
} = chatSlice.actions;
export default chatSlice.reducer;
