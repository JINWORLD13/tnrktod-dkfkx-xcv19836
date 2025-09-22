import { allAnswerAsText } from './allAnswerAsText.jsx';
export const copyText = async JSXTagArr => {
  try {
    if (JSXTagArr?.[JSXTagArr?.length - 1] === null)
      JSXTagArr.pop();
    await navigator.clipboard.writeText(allAnswerAsText(JSXTagArr));
  } catch (err) {
    console.error('Unable to copy text', err);
  }
};
