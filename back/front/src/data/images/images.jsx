import React from 'react';
const imagesPathObj = import.meta.glob('/public/assets/images/deck/*');
const imagesPathArr = Object.keys(imagesPathObj);
export const tarotCardImageFilesList = imagesPathArr.map(elem => {
  return elem.split('/').reverse()[0].split('.')[0];
});
export const tarotCardImageFilesNameList = imagesPathArr.map(elem => {
  return elem.split('/').reverse()[0].split('.')[0].split('_').slice(1).join('_');
});
export const tarotCardImageFilesPathList = imagesPathArr.map(elem => {
  return elem.substring(7);
});
export const tarotCardImageFileFolderPath = imagesPathArr[0].substring(7).split('/').slice(0, -1).join('/');
export const backImagePath = '/assets/images/tarot_card_back.jpg'
