import React, { useCallback, useMemo } from 'react';
import { Color } from 'three';
const NumberHandlers = ({ materials, answerForm }) => {
  const originColor = useMemo(() => new Color(0xffa500), []);
  const newColor = useMemo(() => new Color(0xff0000), []);
  const outNumber01 = useCallback(() => {
    materials.number_one.color.copy(originColor);
  }, [materials.number_one, originColor]);
  const onNumber01 = useCallback(() => {
    if (!answerForm?.isWaiting) {
      materials.number_one.color.copy(newColor);
    }
  }, [materials.number_one, newColor, answerForm?.isWaiting]);
  const outNumber02 = useCallback(() => {
    materials.number_two.color.copy(originColor);
  }, [materials.number_two, originColor]);
  const onNumber02 = useCallback(() => {
    if (!answerForm?.isWaiting) {
      materials.number_two.color.copy(newColor);
    }
  }, [materials.number_two, newColor, answerForm?.isWaiting]);
  return { outNumber01, onNumber01, outNumber02, onNumber02 };
};
export default NumberHandlers;
