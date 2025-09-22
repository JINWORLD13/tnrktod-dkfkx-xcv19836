const tarotTranslationsMajorKR = {
  'The Devil': '악마',
  Death: '죽음',
  'The Hermit': '은둔자',
  Strength: '힘',
  'The Moon': '달',
  'The Fool': '바보',
  'The Hierophant': '교황',
  'The Emperor': '황제',
  'The High Priestess': '여사제',
  'The Empress': '여황제',
  'The Chariot': '전차',
  'The Star': '별',
  'The Lovers': '연인',
  'The Magician': '마법사',
  'The World': '세계',
  Temperance: '절제',
  'The Tower': '타워',
  Judgement: '심판',
  'The Hanged Man': '거꾸로 매달린 남자',
  Justice: '정의',
  'The Sun': '태양',
  'Wheel of Fortune': '운명의 수레바퀴',
};
const tarotTranslationsMinorKR = {
  Pentacles: '펜타클',
  Swords: '소드',
  Cups: '컵',
  Wands: '완즈',
  Knight: '나이트',
  Queen: '퀸',
  King: '킹',
  Page: '페이지',
  Ace: '에이스',
  Two: '투',
  Three: '쓰리',
  Four: '포',
  Five: '파이브',
  Six: '식스',
  Seven: '세븐',
  Eight: '에이트',
  Nine: '나인',
  Ten: '텐',
  of: '오브',
};
const tarotTranslationsMajorJP = {
  'The Devil': '悪魔',
  Death: '死',
  'The Hermit': '隠者',
  Strength: '力',
  'The Moon': '月',
  'The Fool': '愚者',
  'The Hierophant': '法王',
  'The Emperor': '皇帝',
  'The High Priestess': '女教皇',
  'The Empress': '女帝',
  'The Chariot': '戦車',
  'The Star': '星',
  'The Lovers': '恋人',
  'The Magician': '魔術師',
  'The World': '世界',
  Temperance: '節制',
  'The Tower': '塔',
  Judgement: '審判',
  'The Hanged Man': '吊るされた男',
  Justice: '正義',
  'The Sun': '太陽',
  'Wheel of Fortune': '運命の車輪',
};
const tarotTranslationsMinorJP = {
  Pentacles: 'ペンタクル',
  Swords: 'ソード',
  Cups: 'カップ',
  Wands: 'ワンズ',
  Knight: 'ナイト',
  Queen: 'クイーン',
  King: 'キング',
  Page: 'ページ',
  Ace: 'エース',
  Two: 'ツー',
  Three: 'スリー',
  Four: 'フォー',
  Five: 'ファイブ',
  Six: 'シックス',
  Seven: 'セブン',
  Eight: 'エイト',
  Nine: 'ナイン',
  Ten: 'テン',
  of: 'の',
};
const combinedTranslationsKR = {
  ...tarotTranslationsMajorKR,
  ...tarotTranslationsMinorKR,
};
const combinedTranslationsJP = Object.assign(
  {},
  tarotTranslationsMajorJP,
  tarotTranslationsMinorJP
);
export const translateTarotCardName = (selectedTarotCardsArr, browserLanguage) => {
  if (browserLanguage === 'ko') {
    const translatedTokens = selectedTarotCardsArr?.map((elem, i) => {
      const cardName = elem?.trim().split('(')[0]?.trim();
      const major = combinedTranslationsKR[cardName];
      if (major !== undefined && major !== null) {
        return major;
      } else {
        return cardName
          .split(' ')
          .map(token => {
            return combinedTranslationsKR[token] || '';
          })
          .join(' ');
      }
    });
    return translatedTokens;
  }
  if (browserLanguage === 'ja') {
    const translatedTokens = selectedTarotCardsArr.map((elem, i) => {
      const cardName = elem?.trim().split('(')[0]?.trim();
      const major = combinedTranslationsJP[cardName];
      if (major !== undefined && major !== null) {
        return major;
      } else {
        return cardName
          .split(' ')
          .map(token => {
            return combinedTranslationsJP[token] || '';
          })
          .join('');
      }
    });
    return translatedTokens;
  }
};
