const orderVouchersArrMaker = ({ products = [], quantity }) => {
  return products
    .reduce((acc, elem) => {
      const idArr = elem?.id?.split("_");
      if (idArr?.includes("ads") && idArr?.includes("remover")) return acc;
      const lastId = idArr[idArr.length - 1];
      const num = Number(lastId);
      const isIntegerStr = Number.isInteger(num) && !isNaN(num);
      if (quantity && isIntegerStr && !idArr.includes("package")) {
        return [...acc, [num, quantity]];
      } else if (quantity > 0 && idArr.includes("package")) {
        if (
          lastId === "expired" &&
          elem?.id === process.env.PRODUCT_EVENT_PACKAGE
        ) {
          const amount = 10 * quantity;
          const packageVouchers = [
            [1, amount],
            [2, amount],
            [3, amount * 2],
            [4, amount],
            [5, amount],
            [6, amount],
            [10, amount * 2],
          ];
          return [...acc, ...packageVouchers];
        } else if (elem?.id.includes(process.env.PRODUCT_PACKAGE)) {
          let amount;
          let packageVouchers;
          const validIds = ["1", "2", "3", "4", "5", "6", "10"];
          if (
            lastId === "newbie" &&
            elem?.id === process.env.PRODUCT_NEWBIE_PACKAGE
          ) {
            amount = 4 * quantity;
            packageVouchers = [
              [1, amount],
              [2, amount],
              [3, amount],
              [4, amount],
              [5, amount],
              [6, amount],
              [10, amount],
            ];
          } else if (
            validIds.includes(lastId) &&
            elem?.id === `${process.env.PRODUCT_PACKAGE}_${lastId}`
          ) {
            amount = 10 * quantity;
            packageVouchers = [[num, amount]];
          }
          return [...acc, ...packageVouchers];
        }
        return acc;
      }
      return acc;
    }, [])
    ?.filter((elem) => elem.length !== 0);
};
module.exports = orderVouchersArrMaker;
