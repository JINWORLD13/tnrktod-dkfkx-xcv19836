import { useDispatch, useSelector } from 'react-redux';
import {
  resetAllTarotCards,
  setTotalCardsNumber,
} from '../../data/reduxStore/tarotCardStore.jsx';
export const setTotalCardsNumberUtil = count => {
  const dispatch = useDispatch();
  dispatch(setTotalCardsNumber(count));
};
export const useTarotCardDeck = () =>
  useSelector(state => state.tarotCard.tarotCardDeck);
export const useTotalCardsNumber = () =>
  useSelector(state => state.tarotCard.totalCardsNumber);
export const useSelectedTarotCards = () =>
  useSelector(state => state.tarotCard.selectedTarotCards);
export const useResetTarotCards = () => {
  const dispatch = useDispatch();
  dispatch(resetAllTarotCards());
};
