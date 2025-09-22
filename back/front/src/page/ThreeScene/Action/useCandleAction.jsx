import { useCallback, useEffect, useRef } from 'react';
export const useCandleAction = (
  initializedActions,
  time,
  WindowLeftDoorActionState,
  WindowRightDoorActionState,
  leftDoorClick,
  rightDoorClick,
  isWaiting
) => {
  const timeoutIdRef = useRef();
  const actionsRef = useRef(initializedActions);
  const initializeActions = useCallback(() => {
    actionsRef.current = {
      ...actionsRef.current,
      CandleLightAction: actionsRef.current.CandleLightAction || {
        play: () => {},
        stop: () => {},
      },
      CandleLightAction001: actionsRef.current.CandleLightAction001 || {
        play: () => {},
        stop: () => {},
      },
      CandleLightAction002: actionsRef.current.CandleLightAction002 || {
        play: () => {},
        stop: () => {},
      },
      CandleLightAction003: actionsRef.current.CandleLightAction003 || {
        play: () => {},
        stop: () => {},
      },
      CandleLightDuringWindowOpenAction: actionsRef.current
        .CandleLightDuringWindowOpenAction || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      CandleLightDuringWindowOpenAction001: actionsRef.current
        .CandleLightDuringWindowOpenAction001 || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      CandleLightDuringWindowOpenAction002: actionsRef.current
        .CandleLightDuringWindowOpenAction002 || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      CandleLightDuringWindowOpenAction003: actionsRef.current
        .CandleLightDuringWindowOpenAction003 || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      ChandelierCandleLightAction: actionsRef.current
        .ChandelierCandleLightAction || {
        play: () => {},
        stop: () => {},
      },
      ChandelierCandleLightDuringWindowOpenAction: actionsRef.current
        .ChandelierCandleLightDuringWindowOpenAction || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
    };
  }, []);
  useEffect(() => {
    initializeActions();
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [initializeActions, isWaiting]);
  const candleAction = useCallback(() => {
    const actions = actionsRef.current;
    const {
      CandleLightAction,
      CandleLightAction001,
      CandleLightAction002,
      CandleLightAction003,
      CandleLightDuringWindowOpenAction,
      CandleLightDuringWindowOpenAction001,
      CandleLightDuringWindowOpenAction002,
      CandleLightDuringWindowOpenAction003,
      ChandelierCandleLightAction,
      ChandelierCandleLightDuringWindowOpenAction,
    } = actions;
    if (WindowLeftDoorActionState && WindowRightDoorActionState) {
      CandleLightDuringWindowOpenAction?.fadeOut(time / 1000);
      CandleLightDuringWindowOpenAction001?.fadeOut(time / 1000);
      CandleLightDuringWindowOpenAction002?.fadeOut(time / 1000);
      CandleLightDuringWindowOpenAction003?.fadeOut(time / 1000);
      ChandelierCandleLightDuringWindowOpenAction?.fadeOut(time / 1000);
      timeoutIdRef.current = setTimeout(() => {
        CandleLightAction?.play();
        CandleLightAction001?.play();
        CandleLightAction002?.play();
        CandleLightAction003?.play();
        CandleLightDuringWindowOpenAction?.stop();
        CandleLightDuringWindowOpenAction001?.stop();
        CandleLightDuringWindowOpenAction002?.stop();
        CandleLightDuringWindowOpenAction003?.stop();
        ChandelierCandleLightAction?.play();
        ChandelierCandleLightDuringWindowOpenAction?.stop();
      }, time);
    } else if (!WindowLeftDoorActionState && !WindowRightDoorActionState) {
      if (leftDoorClick === 0 && rightDoorClick === 0) {
        CandleLightAction?.play();
        CandleLightAction001?.play();
        CandleLightAction002?.play();
        CandleLightAction003?.play();
        ChandelierCandleLightAction?.play();
      } else {
        CandleLightAction?.stop();
        CandleLightAction001?.stop();
        CandleLightAction002?.stop();
        CandleLightAction003?.stop();
        CandleLightDuringWindowOpenAction?.play();
        CandleLightDuringWindowOpenAction001?.play();
        CandleLightDuringWindowOpenAction002?.play();
        CandleLightDuringWindowOpenAction003?.play();
        ChandelierCandleLightAction?.stop();
        ChandelierCandleLightDuringWindowOpenAction?.play();
      }
    } else {
      if (leftDoorClick !== 0 || rightDoorClick !== 0) {
        CandleLightAction?.stop();
        CandleLightAction001?.stop();
        CandleLightAction002?.stop();
        CandleLightAction003?.stop();
        CandleLightDuringWindowOpenAction?.play();
        CandleLightDuringWindowOpenAction001?.play();
        CandleLightDuringWindowOpenAction002?.play();
        CandleLightDuringWindowOpenAction003?.play();
        ChandelierCandleLightAction?.stop();
        ChandelierCandleLightDuringWindowOpenAction?.play();
        const fadeOutCandles = () => {
          CandleLightDuringWindowOpenAction?.fadeOut(time / 1000);
          CandleLightDuringWindowOpenAction001?.fadeOut(time / 1000);
          CandleLightDuringWindowOpenAction002?.fadeOut(time / 1000);
          CandleLightDuringWindowOpenAction003?.fadeOut(time / 1000);
          ChandelierCandleLightDuringWindowOpenAction?.fadeOut(time / 1000);
          timeoutIdRef.current = setTimeout(() => {
            CandleLightAction?.play();
            CandleLightAction001?.play();
            CandleLightAction002?.play();
            CandleLightAction003?.play();
            CandleLightDuringWindowOpenAction?.stop();
            CandleLightDuringWindowOpenAction001?.stop();
            CandleLightDuringWindowOpenAction002?.stop();
            CandleLightDuringWindowOpenAction003?.stop();
            ChandelierCandleLightAction?.play();
            ChandelierCandleLightDuringWindowOpenAction?.stop();
          }, time);
        };
        if (leftDoorClick === 0 && !WindowLeftDoorActionState) {
          fadeOutCandles();
        }
        if (rightDoorClick === 0 && !WindowRightDoorActionState) {
          fadeOutCandles();
        }
      }
    }
  }, [
    WindowLeftDoorActionState,
    WindowRightDoorActionState,
    time,
    leftDoorClick,
    rightDoorClick,
    isWaiting,
  ]);
  useEffect(() => {
    candleAction();
  }, [candleAction, isWaiting]);
};
