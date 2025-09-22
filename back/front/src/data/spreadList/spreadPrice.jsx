import styles from '../../styles/scss/_SpreadModal.module.scss';
const calculateSalePercentage = (originalPrice, finalPrice) => {
  return Math.round((1 - finalPrice / originalPrice) * 100);
};
const calculateUSDSalePercentage = (listPriceForKRW, originalPriceForUSD) => {
  const rate = 1350;
  return Math.round((1 - listPriceForKRW / rate / originalPriceForUSD) * 100);
};
const calculateUSDListPrice = (originalPriceForUSD, salePercentageForUSD) => {
  return Math.round((originalPriceForUSD * (1 - salePercentageForUSD * 0.01)) * 100) / 100;
};
const originalPriceAndFinalPriceForKRW = {
  1: [200, 90], 
  2: [300, 190],
  3: [400, 200],
  4: [500, 250],
  5: [600, 260],
  6: [700, 270],
  7: [800, 280],
  8: [900, 290],
  9: [1000, 300],
  10: [1100, 330],
  11: [1200, 350],
  13: [1400, 390],
};
const originalPriceForUSD = {
  1: 0.2,
  2: 0.3,
  3: 0.4,
  4: 0.5,
  5: 0.6,
  6: 0.7,
  7: 0.8,
  8: 0.9,
  9: 1.0,
  10: 1.1,
  11: 1.2,
  13: 1.4,
};
export const spreadPriceObjForVoucher = {
  1: {
    originalPrice: originalPriceAndFinalPriceForKRW[1][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[1][0], originalPriceAndFinalPriceForKRW[1][1]),
    listPrice: originalPriceAndFinalPriceForKRW[1][1],
    originalPriceForUSD: originalPriceForUSD[1],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[1][1],
      originalPriceForUSD[1]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[1],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[1][1],
        originalPriceForUSD[1]
      )
    ),
  },
  2: {
    originalPrice: originalPriceAndFinalPriceForKRW[2][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[2][0], originalPriceAndFinalPriceForKRW[2][1]),
    listPrice: originalPriceAndFinalPriceForKRW[2][1],
    originalPriceForUSD: originalPriceForUSD[2],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[2][1],
      originalPriceForUSD[2]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[2],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[2][1],
        originalPriceForUSD[2]
      )
    ),
  },
  3: {
    originalPrice: originalPriceAndFinalPriceForKRW[3][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[3][0], originalPriceAndFinalPriceForKRW[3][1]),
    listPrice: originalPriceAndFinalPriceForKRW[3][1],
    originalPriceForUSD: originalPriceForUSD[3],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[3][1],
      originalPriceForUSD[3]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[3],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[3][1],
        originalPriceForUSD[3]
      )
    ),
  },
  4: {
    originalPrice: originalPriceAndFinalPriceForKRW[4][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[4][0], originalPriceAndFinalPriceForKRW[4][1]),
    listPrice: originalPriceAndFinalPriceForKRW[4][1],
    originalPriceForUSD: originalPriceForUSD[4],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[4][1],
      originalPriceForUSD[4]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[4],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[4][1],
        originalPriceForUSD[4]
      )
    ),
  },
  5: {
    originalPrice: originalPriceAndFinalPriceForKRW[5][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[5][0], originalPriceAndFinalPriceForKRW[5][1]),
    listPrice: originalPriceAndFinalPriceForKRW[5][1],
    originalPriceForUSD: originalPriceForUSD[5],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[5][1],
      originalPriceForUSD[5]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[5],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[5][1],
        originalPriceForUSD[5]
      )
    ),
  },
  6: {
    originalPrice: originalPriceAndFinalPriceForKRW[6][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[6][0], originalPriceAndFinalPriceForKRW[6][1]),
    listPrice: originalPriceAndFinalPriceForKRW[6][1],
    originalPriceForUSD: originalPriceForUSD[6],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[6][1],
      originalPriceForUSD[6]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[6],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[6][1],
        originalPriceForUSD[6]
      )
    ),
  },
  7: {
    originalPrice: originalPriceAndFinalPriceForKRW[7][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[7][0], originalPriceAndFinalPriceForKRW[7][1]),
    listPrice: originalPriceAndFinalPriceForKRW[7][1],
    originalPriceForUSD: originalPriceForUSD[7],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[7][1],
      originalPriceForUSD[7]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[7],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[7][1],
        originalPriceForUSD[7]
      )
    ),
  },
  8: {
    originalPrice: originalPriceAndFinalPriceForKRW[8][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[8][0], originalPriceAndFinalPriceForKRW[8][1]),
    listPrice: originalPriceAndFinalPriceForKRW[8][1],
    originalPriceForUSD: originalPriceForUSD[8],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[8][1],
      originalPriceForUSD[8]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[8],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[8][1],
        originalPriceForUSD[8]
      )
    ),
  },
  9: {
    originalPrice: originalPriceAndFinalPriceForKRW[9][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[9][0], originalPriceAndFinalPriceForKRW[9][1]),
    listPrice: originalPriceAndFinalPriceForKRW[9][1],
    originalPriceForUSD: originalPriceForUSD[9],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[9][1],
      originalPriceForUSD[9]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[9],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[9][1],
        originalPriceForUSD[9]
      )
    ),
  },
  10: {
    originalPrice: originalPriceAndFinalPriceForKRW[10][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[10][0], originalPriceAndFinalPriceForKRW[10][1]),
    listPrice: originalPriceAndFinalPriceForKRW[10][1],
    originalPriceForUSD: originalPriceForUSD[10],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[10][1],
      originalPriceForUSD[10]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[10],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[10][1],
        originalPriceForUSD[10]
      )
    ),
  },
  11: {
    originalPrice: originalPriceAndFinalPriceForKRW[11][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[11][0], originalPriceAndFinalPriceForKRW[11][1]),
    listPrice: originalPriceAndFinalPriceForKRW[11][1],
    originalPriceForUSD: originalPriceForUSD[11],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[11][1],
      originalPriceForUSD[11]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[11],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[11][1],
        originalPriceForUSD[11]
      )
    ),
  },
  13: {
    originalPrice: originalPriceAndFinalPriceForKRW[13][0],
    salePercentage: calculateSalePercentage(originalPriceAndFinalPriceForKRW[13][0], originalPriceAndFinalPriceForKRW[13][1]),
    listPrice: originalPriceAndFinalPriceForKRW[13][1],
    originalPriceForUSD: originalPriceForUSD[13],
    salePercentageForUSD: calculateUSDSalePercentage(
      originalPriceAndFinalPriceForKRW[13][1],
      originalPriceForUSD[13]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[13],
      calculateUSDSalePercentage(
        originalPriceAndFinalPriceForKRW[13][1],
        originalPriceForUSD[13]
      )
    ),
  },
};
