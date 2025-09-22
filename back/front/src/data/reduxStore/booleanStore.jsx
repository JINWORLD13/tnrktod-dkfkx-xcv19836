import { createSlice } from '@reduxjs/toolkit';
let booleanStore = createSlice({
  name: 'booleanStore',
  initialState: {
    isWaiting: false,
    isAnswered: false,
    isDoneAnimationOfBackground: false,
    isReadyToShowDurumagi: false,
  },
  reducers: {
    setIsWaiting(state, action) {
      state.isWaiting = action.payload;
    },
    setIsAnswered(state, action) {
      state.isAnswered = action.payload;
    },
    setIsDoneAnimationOfBackground(state, action) {
      state.isDoneAnimationOfBackground = action.payload;
    },
    setIsReadyToShowDurumagi(state, action) {
      state.isReadyToShowDurumagi = action.payload;
    },
  },
});
export let {
  setIsWaiting,
  setIsAnswered,
  setIsDoneAnimationOfBackground,
  setIsReadyToShowDurumagi,
} = booleanStore.actions;
export default booleanStore;
