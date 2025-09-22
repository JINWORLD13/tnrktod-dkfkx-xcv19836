import { createSlice } from '@reduxjs/toolkit';
let userStore = createSlice({
  name: 'userStore',
  initialState: { userName: '', nickname: '' },
  reducers: {
    setUser(state, action) {
      username = action.payload.username;
      nickname = action.payload.nickname;
    },
  },
});
export let { setUser } = userStore.actions;
export default userStore;
