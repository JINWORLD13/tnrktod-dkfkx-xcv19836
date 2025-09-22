import { createSlice } from '@reduxjs/toolkit';
let tarotHistoryStore = createSlice({
  name: 'tarotHistoryStore',
  initialState: { tarotHistory : [] },
  reducers: {
    setTarotHistoryAction(state, action) {
      state.tarotHistory = action.payload;
    },
  },
});
export let { setTarotHistoryAction } = tarotHistoryStore.actions;
export default tarotHistoryStore;
