import { configureStore } from '@reduxjs/toolkit';
import tarotCard from './tarotCardStore.jsx';
import booleanStore from './booleanStore.jsx';
import userInfoStore from './userInfoStore.jsx';
import tarotHistoryStore from './tarotHistoryStore.jsx';
export function createStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      tarotCard: tarotCard.reducer,
      booleanStore: booleanStore.reducer,
      userInfoStore: userInfoStore.reducer,
      tarotHistoryStore: tarotHistoryStore.reducer,
    },
    preloadedState, 
  });
}
const store = createStore();
export default store;
