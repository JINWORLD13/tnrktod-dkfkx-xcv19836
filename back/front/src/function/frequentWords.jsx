import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
const isNative = Capacitor.isNativePlatform();
const saveData = async (data) => {
  if (isNative) {
    await Preferences.set({
      key: 'frequentWords',
      value: JSON.stringify(data),
    });
  } else {
    localStorage.setItem('frequentWords', JSON.stringify(data));
  }
};
export const getData = async () => {
  if (isNative) {
    const { value } = await Preferences.get({ key: 'frequentWords' });
    return JSON.parse(value || '{}');
  } else {
    return JSON.parse(localStorage.getItem('frequentWords') || '{}');
  }
};
export const addWord = async (category, word) => {
  const data = await getData();
  if (!data[category]) {
    data[category] = [];
  }
  if (!data[category].includes(word)) {
    data[category].push(word);
    await saveData(data);
  }
};
export const getAllWords = async () => {
  return await getData();
};
export const deleteCategory = async (category) => {
  const data = await getData();
  if (data[category]) {
    delete data[category];
    await saveData(data);
  }
};
export const deleteWord = async (category, word) => {
  const data = await getData();
  if (data[category]) {
    const index = data[category].indexOf(word);
    if (index > -1) {
      data[category].splice(index, 1);
      await saveData(data);
    }
  }
};
