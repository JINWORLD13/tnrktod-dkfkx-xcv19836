import { useCallback, useEffect, useRef } from 'react';
const useCandleAction = (
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
      ChandelierCandleLightAction001: actionsRef.current
        .ChandelierCandleLightAction001 || {
        play: () => {},
        stop: () => {},
      },
      ChandelierCandleLightAction002: actionsRef.current
        .ChandelierCandleLightAction002 || {
        play: () => {},
        stop: () => {},
      },
      ChandelierCandleLightAction003: actionsRef.current
        .ChandelierCandleLightAction003 || {
        play: () => {},
        stop: () => {},
      },
      ChandelierCandleLightAction004: actionsRef.current
        .ChandelierCandleLightAction004 || {
        play: () => {},
        stop: () => {},
      },
      ChandelierCandleLightAction005: actionsRef.current
        .ChandelierCandleLightAction005 || {
        play: () => {},
        stop: () => {},
      },
      ChandelierCandleLightAction006: actionsRef.current
        .ChandelierCandleLightAction006 || {
        play: () => {},
        stop: () => {},
      },
      ChandelierCandleLightAction007: actionsRef.current
        .ChandelierCandleLightAction007 || {
        play: () => {},
        stop: () => {},
      },
      ChandelierCandleLightDuringWindowOpenAction: actionsRef.current
        .ChandelierCandleLightDuringWindowOpenAction || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      ChandelierCandleLightDuringWindowOpenAction001: actionsRef.current
        .ChandelierCandleLightDuringWindowOpenAction001 || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      ChandelierCandleLightDuringWindowOpenAction002: actionsRef.current
        .ChandelierCandleLightDuringWindowOpenAction002 || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      ChandelierCandleLightDuringWindowOpenAction003: actionsRef.current
        .ChandelierCandleLightDuringWindowOpenAction003 || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      ChandelierCandleLightDuringWindowOpenAction004: actionsRef.current
        .ChandelierCandleLightDuringWindowOpenAction004 || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      ChandelierCandleLightDuringWindowOpenAction005: actionsRef.current
        .ChandelierCandleLightDuringWindowOpenAction005 || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      ChandelierCandleLightDuringWindowOpenAction006: actionsRef.current
        .ChandelierCandleLightDuringWindowOpenAction006 || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
      ChandelierCandleLightDuringWindowOpenAction007: actionsRef.current
        .ChandelierCandleLightDuringWindowOpenAction007 || {
        play: () => {},
        stop: () => {},
        fadeOut: () => {},
      },
    };
  }, []);
  useEffect(() => {
    initializeActions();
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
      ChandelierCandleLightAction001,
      ChandelierCandleLightAction002,
      ChandelierCandleLightAction003,
      ChandelierCandleLightAction004,
      ChandelierCandleLightAction005,
      ChandelierCandleLightAction006,
      ChandelierCandleLightAction007,
      ChandelierCandleLightDuringWindowOpenAction,
      ChandelierCandleLightDuringWindowOpenAction001,
      ChandelierCandleLightDuringWindowOpenAction002,
      ChandelierCandleLightDuringWindowOpenAction003,
      ChandelierCandleLightDuringWindowOpenAction004,
      ChandelierCandleLightDuringWindowOpenAction005,
      ChandelierCandleLightDuringWindowOpenAction006,
      ChandelierCandleLightDuringWindowOpenAction007,
    } = actions;
    if (WindowLeftDoorActionState && WindowRightDoorActionState) {
      CandleLightDuringWindowOpenAction?.fadeOut(time / 1000);
      CandleLightDuringWindowOpenAction001?.fadeOut(time / 1000);
      CandleLightDuringWindowOpenAction002?.fadeOut(time / 1000);
      CandleLightDuringWindowOpenAction003?.fadeOut(time / 1000);
      ChandelierCandleLightDuringWindowOpenAction?.fadeOut(time / 1000);
      ChandelierCandleLightDuringWindowOpenAction001?.fadeOut(time / 1000);
      ChandelierCandleLightDuringWindowOpenAction002?.fadeOut(time / 1000);
      ChandelierCandleLightDuringWindowOpenAction003?.fadeOut(time / 1000);
      ChandelierCandleLightDuringWindowOpenAction004?.fadeOut(time / 1000);
      ChandelierCandleLightDuringWindowOpenAction005?.fadeOut(time / 1000);
      ChandelierCandleLightDuringWindowOpenAction006?.fadeOut(time / 1000);
      ChandelierCandleLightDuringWindowOpenAction007?.fadeOut(time / 1000);
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
        ChandelierCandleLightAction001?.play();
        ChandelierCandleLightAction002?.play();
        ChandelierCandleLightAction003?.play();
        ChandelierCandleLightAction004?.play();
        ChandelierCandleLightAction005?.play();
        ChandelierCandleLightAction006?.play();
        ChandelierCandleLightAction007?.play();
        ChandelierCandleLightDuringWindowOpenAction?.stop();
        ChandelierCandleLightDuringWindowOpenAction001?.stop();
        ChandelierCandleLightDuringWindowOpenAction002?.stop();
        ChandelierCandleLightDuringWindowOpenAction003?.stop();
        ChandelierCandleLightDuringWindowOpenAction004?.stop();
        ChandelierCandleLightDuringWindowOpenAction005?.stop();
        ChandelierCandleLightDuringWindowOpenAction006?.stop();
        ChandelierCandleLightDuringWindowOpenAction007?.stop();
      }, time);
    } else if (!WindowLeftDoorActionState && !WindowRightDoorActionState) {
      if (leftDoorClick === 0 && rightDoorClick === 0) {
        CandleLightAction?.play();
        CandleLightAction001?.play(); 
        CandleLightAction002?.play();
        CandleLightAction003?.play();
        ChandelierCandleLightAction?.play();
        ChandelierCandleLightAction001?.play();
        ChandelierCandleLightAction002?.play();
        ChandelierCandleLightAction003?.play();
        ChandelierCandleLightAction004?.play();
        ChandelierCandleLightAction005?.play();
        ChandelierCandleLightAction006?.play();
        ChandelierCandleLightAction007?.play();
      } else {
        CandleLightDuringWindowOpenAction?.play();
        CandleLightDuringWindowOpenAction001?.play();
        CandleLightDuringWindowOpenAction002?.play();
        CandleLightDuringWindowOpenAction003?.play();
        ChandelierCandleLightAction?.stop();
        ChandelierCandleLightAction001?.stop();
        ChandelierCandleLightAction002?.stop();
        ChandelierCandleLightAction003?.stop();
        ChandelierCandleLightAction004?.stop();
        ChandelierCandleLightAction005?.stop();
        ChandelierCandleLightAction006?.stop();
        ChandelierCandleLightAction007?.stop();
        ChandelierCandleLightDuringWindowOpenAction?.play();
        ChandelierCandleLightDuringWindowOpenAction001?.play();
        ChandelierCandleLightDuringWindowOpenAction002?.play();
        ChandelierCandleLightDuringWindowOpenAction003?.play();
        ChandelierCandleLightDuringWindowOpenAction004?.play();
        ChandelierCandleLightDuringWindowOpenAction005?.play();
        ChandelierCandleLightDuringWindowOpenAction006?.play();
        ChandelierCandleLightDuringWindowOpenAction007?.play();
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
        ChandelierCandleLightAction001?.stop();
        ChandelierCandleLightAction002?.stop();
        ChandelierCandleLightAction003?.stop();
        ChandelierCandleLightAction004?.stop();
        ChandelierCandleLightAction005?.stop();
        ChandelierCandleLightAction006?.stop();
        ChandelierCandleLightAction007?.stop();
        ChandelierCandleLightDuringWindowOpenAction?.play();
        ChandelierCandleLightDuringWindowOpenAction001?.play();
        ChandelierCandleLightDuringWindowOpenAction002?.play();
        ChandelierCandleLightDuringWindowOpenAction003?.play();
        ChandelierCandleLightDuringWindowOpenAction004?.play();
        ChandelierCandleLightDuringWindowOpenAction005?.play();
        ChandelierCandleLightDuringWindowOpenAction006?.play();
        ChandelierCandleLightDuringWindowOpenAction007?.play();
        const fadeOutCandles = () => {
          CandleLightDuringWindowOpenAction?.fadeOut(time / 1000);
          CandleLightDuringWindowOpenAction001?.fadeOut(time / 1000);
          CandleLightDuringWindowOpenAction002?.fadeOut(time / 1000);
          CandleLightDuringWindowOpenAction003?.fadeOut(time / 1000);
          ChandelierCandleLightDuringWindowOpenAction?.fadeOut(time / 1000);
          ChandelierCandleLightDuringWindowOpenAction001?.fadeOut(time / 1000);
          ChandelierCandleLightDuringWindowOpenAction002?.fadeOut(time / 1000);
          ChandelierCandleLightDuringWindowOpenAction003?.fadeOut(time / 1000);
          ChandelierCandleLightDuringWindowOpenAction004?.fadeOut(time / 1000);
          ChandelierCandleLightDuringWindowOpenAction005?.fadeOut(time / 1000);
          ChandelierCandleLightDuringWindowOpenAction006?.fadeOut(time / 1000);
          ChandelierCandleLightDuringWindowOpenAction007?.fadeOut(time / 1000);
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
            ChandelierCandleLightAction001?.play();
            ChandelierCandleLightAction002?.play();
            ChandelierCandleLightAction003?.play();
            ChandelierCandleLightAction004?.play();
            ChandelierCandleLightAction005?.play();
            ChandelierCandleLightAction006?.play();
            ChandelierCandleLightAction007?.play();
            ChandelierCandleLightDuringWindowOpenAction?.stop();
            ChandelierCandleLightDuringWindowOpenAction001?.stop();
            ChandelierCandleLightDuringWindowOpenAction002?.stop();
            ChandelierCandleLightDuringWindowOpenAction003?.stop();
            ChandelierCandleLightDuringWindowOpenAction004?.stop();
            ChandelierCandleLightDuringWindowOpenAction005?.stop();
            ChandelierCandleLightDuringWindowOpenAction006?.stop();
            ChandelierCandleLightDuringWindowOpenAction007?.stop();
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
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [candleAction, isWaiting]);
};
export default useCandleAction;
