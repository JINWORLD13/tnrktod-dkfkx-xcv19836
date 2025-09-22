import { createSlice } from '@reduxjs/toolkit';
import { tarotDeck } from '../TarotCardDeck/TarotCardDeck.jsx';
let tarotCard = createSlice({
  name: 'tarotCard',
  initialState: {
    tarotCardDeck: [...tarotDeck],
    selectedTarotCards: new Array(0),
    totalCardsNumber: 0,
  },
  reducers: {
    resetAllTarotCardsWithoutReverse(state) { 
      const resetDeck = [...tarotDeck]
      for (let i = resetDeck?.length - 1; i >= 0; i--) {
        const random = Math.random()
        const j = Math.floor(random * (i + 1));
        [resetDeck[i], resetDeck[j]] = [
          resetDeck[j],
          resetDeck[i],
        ];
      }
      return {...state, selectedTarotCards: new Array(0),tarotCardDeck: resetDeck};
    },
    shuffleTarotCardDeckWithoutReverse(state) {
      if (state.tarotCardDeck?.length !== 78) {
        console.log('tarot deck is not reset.');
        return;
      }
      const shuffledDeck = [...state.tarotCardDeck];
      for (let i = shuffledDeck?.length - 1; i >= 0; i--) {
        const random = Math.random()
        const j = Math.floor(random * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [
          shuffledDeck[j],
          shuffledDeck[i],
        ];
      }
      console.log('tarot deck is shuffled without revered cards.');
      return {...state, tarotCardDeck: shuffledDeck};
    },
    resetAllTarotCards(state) {
      const resetDeck = [...tarotDeck]
      for (let i = resetDeck?.length - 1; i >= 0; i--) {
        const random = Math.random()
        const j = Math.floor(random * (i + 1));
        const reverse = random < 0.3;
        if(reverse) {
          resetDeck[j]={...resetDeck[j], reversed : true}; 
        }
        [resetDeck[i], resetDeck[j]] = [
          resetDeck[j],
          resetDeck[i],
        ];
      }
      return {...state, selectedTarotCards: new Array(0),tarotCardDeck: resetDeck};
    },
    shuffleTarotCardDeck(state) {
      if (state.tarotCardDeck?.length !== 78) {
        console.log('tarot deck is not reset.');
        return;
      }
      const shuffledDeck = [...state.tarotCardDeck];
      for (let i = shuffledDeck?.length - 1; i >= 0; i--) {
        const random = Math.random()
        const j = Math.floor(random * (i + 1));
        const reverse = random < 0.3;
        if(reverse) {
          shuffledDeck[j]={...shuffledDeck[j], reversed : true}; 
        }
        [shuffledDeck[i], shuffledDeck[j]] = [
          shuffledDeck[j],
          shuffledDeck[i],
        ];
      }
      console.log('tarot deck is shuffled with revered cards.');
      return {...state, tarotCardDeck: shuffledDeck};
    },
    drawCard(state, action) {
      if (state.selectedTarotCards?.length >= action.payload.cardNumber) {
        console.log('not allowed to draw');
        return;
      }
      const extractedCard =
        state.tarotCardDeck[action.payload.shuffledCardIndex];
      console.log('draw card');
      state.selectedTarotCards.push(extractedCard);
      return state; 
    },
    setTotalCardsNumber(state, action) {
      state.totalCardsNumber = action.payload;
      return state;
    },
  },
});
export let {
  resetAllTarotCardsWithoutReverse,
  resetAllTarotCards,
  shuffleTarotCardDeckWithoutReverse,
  shuffleTarotCardDeck,
  drawCard,
  setTotalCardsNumber,
} = tarotCard.actions;
export default tarotCard;
