import { createSlice } from '@reduxjs/toolkit';
let userInfoStore = createSlice({
  name: 'userInfoStore',
  initialState: { userInfo: {}, userInfoForRefund: {} },
  reducers: {
    setUserInfoAction(state, action) {
      state.userInfo = action.payload;
    },
    setUserInfoForRefundAction(state, action) {
      state.userInfoForRefund = action.payload;
    },
  },
});
export let { setUserInfoAction, setUserInfoForRefundAction } =
  userInfoStore.actions;
export default userInfoStore;
