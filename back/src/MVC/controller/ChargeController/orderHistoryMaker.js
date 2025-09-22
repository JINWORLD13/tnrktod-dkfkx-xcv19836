const localTimeToUTC = require("../../../misc/localTimeToUTC");
const getPackageKeyMultiplier = (packageId) => {
  const defaultKeys = [1, 2, 3, 4, 5, 6, 10];
  const packageConfigs = {
    [process.env.PRODUCT_NEWBIE_PACKAGE]: {
      1: 4,
      2: 4,
      3: 4,
      4: 4,
      5: 4,
      6: 4,
      10: 4,
    },
    [process.env.PRODUCT_PACKAGE_1]: { targetKey: 1, quantity: 10 },
    [process.env.PRODUCT_PACKAGE_2]: { targetKey: 2, quantity: 10 },
    [process.env.PRODUCT_PACKAGE_3]: { targetKey: 3, quantity: 10 },
    [process.env.PRODUCT_PACKAGE_4]: { targetKey: 4, quantity: 10 },
    [process.env.PRODUCT_PACKAGE_5]: { targetKey: 5, quantity: 10 },
    [process.env.PRODUCT_PACKAGE_6]: { targetKey: 6, quantity: 10 },
    [process.env.PRODUCT_PACKAGE_10]: { targetKey: 10, quantity: 10 },
  };
  const config = packageConfigs[packageId];
  if (!config) {
    return null;
  }
  if (packageId === process.env.PRODUCT_NEWBIE_PACKAGE) {
    return config;
  }
  const keyToMultiplier = {};
  defaultKeys.forEach((key) => {
    keyToMultiplier[key] = key === config.targetKey ? config.quantity : 0;
  });
  return keyToMultiplier;
};
const getKeyMultiplierByLastId = (lastId, elemId) => {
  const idMappings = {
    newbie: process.env.PRODUCT_NEWBIE_PACKAGE,
    1: process.env.PRODUCT_PACKAGE_1,
    2: process.env.PRODUCT_PACKAGE_2,
    3: process.env.PRODUCT_PACKAGE_3,
    4: process.env.PRODUCT_PACKAGE_4,
    5: process.env.PRODUCT_PACKAGE_5,
    6: process.env.PRODUCT_PACKAGE_6,
    10: process.env.PRODUCT_PACKAGE_10,
  };
  const expectedPackageId = idMappings[lastId];
  if (expectedPackageId && elemId === expectedPackageId) {
    return getPackageKeyMultiplier(elemId);
  }
  return null;
};
const VOUCHER_KEYS = [1, 2, 3, 4, 5, 6, 10];
const createVoucherArray = (
  quantity,
  productId,
  orderId,
  purchaseDate,
  purchaseToken,
  packageName,
  expiryDate = ""
) => {
  return [
    quantity,
    "NA",
    "NA",
    productId,
    orderId,
    purchaseDate,
    "NA",
    "NA",
    purchaseToken,
    packageName,
    expiryDate,
  ];
};
const orderHistoryMaker = ({
  products = [],
  quantity = 0,
  productId = "",
  orderId = "",
  purchaseDate = new Date(),
  purchaseToken = "",
  packageName = "",
  zd = 0,
}) => {
  return {
    ...products.reduce((acc, elem) => {
      const idArr = elem?.id?.split("_");
      if (idArr?.includes("ads") && idArr?.includes("remover")) return;
      const lastId = idArr[idArr.length - 1];
      const num = Number(lastId);
      const isIntegerStr = Number.isInteger(num) && !isNaN(num);
      if (quantity > 0 && isIntegerStr && !idArr.includes("package")) {
        acc[`${lastId}`] = [
          elem?.quantity || quantity,
          "NA",
          "NA",
          productId,
          orderId,
          purchaseDate,
          "NA",
          "NA",
          purchaseToken,
          packageName,
        ];
      } else if (quantity > 0 && idArr.includes("package")) {
        if (
          lastId === "expired" &&
          elem?.id === process.env.PRODUCT_EVENT_PACKAGE
        ) {
          const keyToMultiplier = {
            1: 10,
            2: 10,
            3: 20,
            4: 10,
            5: 10,
            6: 10,
            10: 20,
          };
          VOUCHER_KEYS.forEach((key) => {
            const multiplier = keyToMultiplier[key];
            if (multiplier > 0) {
              acc[key] = createVoucherArray(
                (elem?.quantity ?? quantity) * multiplier,
                productId,
                orderId,
                purchaseDate,
                purchaseToken,
                packageName,
                localTimeToUTC(zd, 2025, 8, 26, 0, 0, 0)
              );
            }
          });
        } else if (elem?.id.includes(process.env.PRODUCT_PACKAGE)) {
          const keyToMultiplier = getKeyMultiplierByLastId(lastId, elem?.id);
          if (keyToMultiplier) {
            VOUCHER_KEYS.forEach((key) => {
              const multiplier = keyToMultiplier[key];
              if (multiplier > 0) {
                acc[key] = createVoucherArray(
                  (elem?.quantity ?? quantity) * multiplier,
                  productId,
                  orderId,
                  purchaseDate,
                  purchaseToken,
                  packageName
                );
              }
            });
          }
        }
      }
      return acc;
    }, {}),
  };
};
module.exports = orderHistoryMaker;
