import styles from '../../styles/scss/_SpreadModal.module.scss';
const priceOnSale = (originalPrice, salePercentage) => {
  return originalPrice * (1 - salePercentage * 0.01);
};
const calculateUSDSalePercentage = (listPriceForKRW, originalPriceForUSD) => {
  const rate = 1350;
  return Math.round((1 - listPriceForKRW / rate / originalPriceForUSD) * 100);
};
const calculateUSDListPrice = (originalPriceForUSD, salePercentageForUSD) => {
  return (
    Math.round(priceOnSale(originalPriceForUSD, salePercentageForUSD) * 100) /
    100
  );
};
const originalPriceForKRWWithPercentage = {
  1: [150, 40], 
  2: [280, 50],
  3: [300, 50],
  4: [400, 60],
  5: [500, 66],
  6: [600, 70],
  7: [700, 70],
  8: [800, 70],
  9: [900, 70],
  10: [1000, 70],
  11: [1100, 70],
  13: [1300, 70],
};
const originalPriceForUSD = {
  1: 0.1, 
  2: 0.2,
  3: 0.3,
  4: 0.4,
  5: 0.5,
  6: 0.6,
  7: 0.7,
  8: 0.8,
  9: 0.9,
  10: 1,
  11: 1.1,
  13: 1.3,
};
export const spreadPriceObjForVoucher = {
  1: {
    originalPrice: originalPriceForKRWWithPercentage[1][0],
    salePercentage: originalPriceForKRWWithPercentage[1][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[1][0],
        originalPriceForKRWWithPercentage[1][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[1],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[1][0],
          originalPriceForKRWWithPercentage[1][1]
        )
      ),
      originalPriceForUSD[1]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[1],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[1][0],
            originalPriceForKRWWithPercentage[1][1]
          )
        ),
        originalPriceForUSD[1]
      )
    ),
  },
  2: {
    originalPrice: originalPriceForKRWWithPercentage[2][0],
    salePercentage: originalPriceForKRWWithPercentage[2][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[2][0],
        originalPriceForKRWWithPercentage[2][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[2],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[2][0],
          originalPriceForKRWWithPercentage[2][1]
        )
      ),
      originalPriceForUSD[2]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[2],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[2][0],
            originalPriceForKRWWithPercentage[2][1]
          )
        ),
        originalPriceForUSD[2]
      )
    ),
  },
  3: {
    originalPrice: originalPriceForKRWWithPercentage[3][0],
    salePercentage: originalPriceForKRWWithPercentage[3][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[3][0],
        originalPriceForKRWWithPercentage[3][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[3],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[3][0],
          originalPriceForKRWWithPercentage[3][1]
        )
      ),
      originalPriceForUSD[3]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[3],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[3][0],
            originalPriceForKRWWithPercentage[3][1]
          )
        ),
        originalPriceForUSD[3]
      )
    ),
  },
  4: {
    originalPrice: originalPriceForKRWWithPercentage[4][0],
    salePercentage: originalPriceForKRWWithPercentage[4][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[4][0],
        originalPriceForKRWWithPercentage[4][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[4],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[4][0],
          originalPriceForKRWWithPercentage[4][1]
        )
      ),
      originalPriceForUSD[4]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[4],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[4][0],
            originalPriceForKRWWithPercentage[4][1]
          )
        ),
        originalPriceForUSD[4]
      )
    ),
  },
  5: {
    originalPrice: originalPriceForKRWWithPercentage[5][0],
    salePercentage: originalPriceForKRWWithPercentage[5][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[5][0],
        originalPriceForKRWWithPercentage[5][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[5],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[5][0],
          originalPriceForKRWWithPercentage[5][1]
        )
      ),
      originalPriceForUSD[5]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[5],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[5][0],
            originalPriceForKRWWithPercentage[5][1]
          )
        ),
        originalPriceForUSD[5]
      )
    ),
  },
  6: {
    originalPrice: originalPriceForKRWWithPercentage[6][0],
    salePercentage: originalPriceForKRWWithPercentage[6][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[6][0],
        originalPriceForKRWWithPercentage[6][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[6],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[6][0],
          originalPriceForKRWWithPercentage[6][1]
        )
      ),
      originalPriceForUSD[6]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[6],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[6][0],
            originalPriceForKRWWithPercentage[6][1]
          )
        ),
        originalPriceForUSD[6]
      )
    ),
  },
  7: {
    originalPrice: originalPriceForKRWWithPercentage[7][0],
    salePercentage: originalPriceForKRWWithPercentage[7][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[7][0],
        originalPriceForKRWWithPercentage[7][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[7],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[7][0],
          originalPriceForKRWWithPercentage[7][1]
        )
      ),
      originalPriceForUSD[7]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[7],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[7][0],
            originalPriceForKRWWithPercentage[7][1]
          )
        ),
        originalPriceForUSD[7]
      )
    ),
  },
  8: {
    originalPrice: originalPriceForKRWWithPercentage[8][0],
    salePercentage: originalPriceForKRWWithPercentage[8][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[8][0],
        originalPriceForKRWWithPercentage[8][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[8],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[8][0],
          originalPriceForKRWWithPercentage[8][1]
        )
      ),
      originalPriceForUSD[8]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[8],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[8][0],
            originalPriceForKRWWithPercentage[8][1]
          )
        ),
        originalPriceForUSD[8]
      )
    ),
  },
  9: {
    originalPrice: originalPriceForKRWWithPercentage[9][0],
    salePercentage: originalPriceForKRWWithPercentage[9][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[9][0],
        originalPriceForKRWWithPercentage[9][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[9],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[9][0],
          originalPriceForKRWWithPercentage[9][1]
        )
      ),
      originalPriceForUSD[9]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[9],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[9][0],
            originalPriceForKRWWithPercentage[9][1]
          )
        ),
        originalPriceForUSD[9]
      )
    ),
  },
  10: {
    originalPrice: originalPriceForKRWWithPercentage[10][0],
    salePercentage: originalPriceForKRWWithPercentage[10][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[10][0],
        originalPriceForKRWWithPercentage[10][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[10],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[10][0],
          originalPriceForKRWWithPercentage[10][1]
        )
      ),
      originalPriceForUSD[10]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[10],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[10][0],
            originalPriceForKRWWithPercentage[10][1]
          )
        ),
        originalPriceForUSD[10]
      )
    ),
  },
  11: {
    originalPrice: originalPriceForKRWWithPercentage[11][0],
    salePercentage: originalPriceForKRWWithPercentage[11][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[11][0],
        originalPriceForKRWWithPercentage[11][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[11],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[11][0],
          originalPriceForKRWWithPercentage[11][1]
        )
      ),
      originalPriceForUSD[11]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[11],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[11][0],
            originalPriceForKRWWithPercentage[11][1]
          )
        ),
        originalPriceForUSD[11]
      )
    ),
  },
  13: {
    originalPrice: originalPriceForKRWWithPercentage[13][0],
    salePercentage: originalPriceForKRWWithPercentage[13][1],
    listPrice: Math.ceil(
      priceOnSale(
        originalPriceForKRWWithPercentage[13][0],
        originalPriceForKRWWithPercentage[13][1]
      )
    ),
    originalPriceForUSD: originalPriceForUSD[13],
    salePercentageForUSD: calculateUSDSalePercentage(
      Math.ceil(
        priceOnSale(
          originalPriceForKRWWithPercentage[13][0],
          originalPriceForKRWWithPercentage[13][1]
        )
      ),
      originalPriceForUSD[13]
    ),
    listPriceForUSD: calculateUSDListPrice(
      originalPriceForUSD[13],
      calculateUSDSalePercentage(
        Math.ceil(
          priceOnSale(
            originalPriceForKRWWithPercentage[13][0],
            originalPriceForKRWWithPercentage[13][1]
          )
        ),
        originalPriceForUSD[13]
      )
    ),
  },
};
