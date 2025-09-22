import { useCallback, useEffect, useRef } from 'react';
export const useCrystalAction = (
  initialActions,
  isTarotAnswerWaitingState,
  isTarotAnsweredState,
  isReadyToShowDurumagiState,
  setMagicOn = undefined
) => {
  const actionsRef = useRef(initialActions);
  const timerRef = useRef(null);
  const timerOfMagicRef = useRef(null);
  const intervalRef = useRef(null);
  const currentActionRef = useRef(null);
  useEffect(() => {
    actionsRef.current = initialActions;
    return () => {
      actionsRef.current = null;
    };
  }, [initialActions]);
  const crystalAction = useCallback(() => {
    const actions = actionsRef.current;
    const transitionAnimation = (targetAction, timeScale, fadeOutActions) => {
      const parts = [
        'Head',
        'Body',
        'LeftArm',
        'LeftLeg',
        'RightArm',
        'RightLeg',
      ];
      parts.forEach(part => {
        fadeOutActions.forEach(actionType => {
          const action = actions?.[`${actionType}${part}`];
          if (action) action.fadeOut(1);
        });
        const action = actions?.[`${targetAction}${part}`];
        if (action) {
          action.timeScale = timeScale;
          action.reset().fadeIn(2).play();
        }
      });
    };
    const greetingAction = () => {
      if (currentActionRef.current === 'greeting') return;
      currentActionRef.current = 'greeting';
      transitionAnimation('GreetingAction', 0.7, [
        'MagicAction',
        'WaitingAction',
      ]);
      if (setMagicOn) {
        setMagicOn(false);
        actions?.MagicSetAction?.fadeOut(1);
      }
    };
    const magicAction = () => {
      if (currentActionRef.current === 'magic') return;
      currentActionRef.current = 'magic';
      transitionAnimation('MagicAction', 0.5, [
        'GreetingAction',
        'WaitingAction',
      ]);
      if (setMagicOn) {
        timerOfMagicRef.current = setTimeout(() => {
          setMagicOn(true);
          actions?.MagicSetAction?.reset().fadeIn(2).play();
        }, 1500);
      }
    };
    const waitingAction = () => {
      if (currentActionRef.current === 'waiting') return;
      currentActionRef.current = 'waiting';
      transitionAnimation('WaitingAction', 0.5, [
        'GreetingAction',
        'MagicAction',
      ]);
      if (setMagicOn) {
        setMagicOn(false);
        actions?.MagicSetAction?.fadeOut(1);
      }
    };
    if (timerRef.current) clearTimeout(timerRef.current);
    if (timerOfMagicRef.current) clearTimeout(timerOfMagicRef.current);
    if (
      isTarotAnswerWaitingState ||
      (!isReadyToShowDurumagiState && isTarotAnsweredState)
    ) {
      waitingAction();
    } else {
      const executeSequence = () => {
        greetingAction();
        timerRef.current = setTimeout(magicAction, 8000);
      };
      executeSequence();
    }
    actions?.LightInCrystalBallAction?.play();
  }, [
    isTarotAnswerWaitingState,
    isTarotAnsweredState,
    isReadyToShowDurumagiState,
    setMagicOn,
  ]);
  useEffect(() => {
    if (!isReadyToShowDurumagiState && isTarotAnsweredState) return;
    crystalAction();
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (
          !isTarotAnswerWaitingState &&
          !(isTarotAnsweredState && !isReadyToShowDurumagiState)
        ) {
          crystalAction();
        }
      }, 13000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (timerOfMagicRef.current) clearTimeout(timerOfMagicRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [crystalAction]);
  return null;
};
