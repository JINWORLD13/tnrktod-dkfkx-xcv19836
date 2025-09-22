const { chargeService, userService } = require("../../../service");
const processInAppPurchaseConsumption = require("./processInAppPurchaseConsumption");
function categorizeAndSortVouchers(vouchersArr) {
  const expiredWebVouchers = [];
  const expiredAppVouchers = [];
  const regularWebVouchers = [];
  const regularAppVouchers = [];
  vouchersArr.forEach((voucher) => {
    try {
      const packageName = voucher[9];
      const expireDate = voucher?.[10]; 
      const isApp =
        typeof packageName === "string" && packageName.includes("com.");
      const hasExpireDateAndWithinExpireDate =
        expireDate &&
        expireDate !== "NA" &&
        expireDate !== "N.A" &&
        expireDate !== null &&
        expireDate !== undefined &&
        expireDate !== "" &&
        expireDate.toString().trim() !== "";
      if (hasExpireDateAndWithinExpireDate) {
        if (expireDate && new Date(expireDate) > new Date()) {
          if (isApp) {
            expiredAppVouchers.push(voucher);
          } else {
            expiredWebVouchers.push(voucher);
          }
        }
      } else {
        if (isApp) {
          regularAppVouchers.push(voucher);
        } else {
          regularWebVouchers.push(voucher);
        }
      }
    } catch (error) {
      console.error("Error categorizing voucher:", error);
      if (new Date(expireDate) > new Date()) regularWebVouchers.push(voucher);
    }
  });
  const sortByExpireDate = (a, b) => {
    try {
      return new Date(a[10]) - new Date(b[10]);
    } catch (error) {
      return 0;
    }
  };
  const sortByPurchaseDate = (a, b) => {
    try {
      return new Date(a[5]) - new Date(b[5]);
    } catch (error) {
      return 0;
    }
  };
  expiredWebVouchers.sort(sortByExpireDate);
  expiredAppVouchers.sort(sortByExpireDate);
  regularWebVouchers.sort(sortByPurchaseDate);
  regularAppVouchers.sort(sortByPurchaseDate);
  console.log(
    `Categorized vouchers: Expiring Web=${expiredWebVouchers.length}, Expiring App=${expiredAppVouchers.length}, Normal Web=${regularWebVouchers.length}, Normal App=${regularAppVouchers.length}`
  );
  return {
    expiredWebVouchers,
    expiredAppVouchers,
    regularWebVouchers,
    regularAppVouchers,
  };
}
async function processVoucherConsumption(userInfo, inputQuestionData) {
  try {
    const initialVouchersInDetail = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      13: [],
    };
    const vouchersInDetailOfUser =
      userInfo?.vouchersInDetail || initialVouchersInDetail;
    let updatedVouchersInDetailOfUser = {};
    Object.keys(initialVouchersInDetail).forEach((key) => {
      if (
        vouchersInDetailOfUser[key] &&
        Array.isArray(vouchersInDetailOfUser[key])
      ) {
        updatedVouchersInDetailOfUser[key] = vouchersInDetailOfUser[key].map(
          (voucher) => (Array.isArray(voucher) ? [...voucher] : voucher)
        );
      } else {
        updatedVouchersInDetailOfUser[key] = [];
      }
    });
    const voucherToBeUsed = inputQuestionData.tarotSpreadVoucherPrice; 
    const [voucherType, voucherAmount] = voucherToBeUsed;
    if (voucherAmount <= 0) {
      throw new Error("wrong info on voucher price");
    }
    let voucherAmountToBeUsed = voucherAmount;
    const remainingVouchersArr = [...(updatedVouchersInDetailOfUser[voucherType] || [])];
    console.log(
      "remainingVouchersArr : ",
      JSON.stringify(remainingVouchersArr)
    );
    console.log("Starting voucher consumption process with priority logic");
    if (remainingVouchersArr.length === 0) {
      console.log("No vouchers available");
      return userInfo;
    }
    const categorizedVouchers = categorizeAndSortVouchers(remainingVouchersArr);
    console.log("categorizedVouchers : ", JSON.stringify(categorizedVouchers));
    let prevOrderId;
    const priorityGroups = [
      {
        name: "Expiring Web Voucher",
        vouchers: categorizedVouchers.expiredWebVouchers,
      },
      {
        name: "Expiring App Voucher",
        vouchers: categorizedVouchers.expiredAppVouchers,
      },
      {
        name: "Normal Web Voucher",
        vouchers: categorizedVouchers.regularWebVouchers,
      },
      {
        name: "Normal App Voucher",
        vouchers: categorizedVouchers.regularAppVouchers,
      },
    ];
    for (const group of priorityGroups) {
      if (voucherAmountToBeUsed <= 0) break;
      console.log(
        `Processing ${group.name}: ${group.vouchers.length} vouchers available`
      );
      for (
        let i = 0;
        i < group.vouchers.length && voucherAmountToBeUsed > 0;
        i++
      ) {
        console.log(
          `Processing voucher ${i + 1} of ${group.vouchers.length} from ${
            group.name
          }`
        );
        const {
          voucherAmountToBeUsed: remainingAmountToBePaid,
          prevOrderId: updatedPrevOrderId,
        } = await consumeVoucher(
          group.vouchers[i],
          voucherAmountToBeUsed,
          userInfo,
          prevOrderId,
          updatedVouchersInDetailOfUser
        );
        voucherAmountToBeUsed = remainingAmountToBePaid;
        prevOrderId = updatedPrevOrderId;
        if (group.vouchers[i][0] <= 0) {
          group.vouchers.splice(i, 1);
          i--; 
        }
      }
    }
    updatedVouchersInDetailOfUser[voucherType] = [
      ...categorizedVouchers.expiredWebVouchers,
      ...categorizedVouchers.expiredAppVouchers,
      ...categorizedVouchers.regularWebVouchers,
      ...categorizedVouchers.regularAppVouchers,
    ];
    console.log(
      "updatedVouchersInDetailOfUser[voucherType] : ",
      JSON.stringify(updatedVouchersInDetailOfUser[voucherType])
    );
    if (voucherAmountToBeUsed > 0) {
      console.log(
        `Warning: Not enough vouchers to consume. Remaining amount: ${voucherAmountToBeUsed}`
      );
    }
    console.log("Voucher consumption process completed");
    const vouchersOfUser = userInfo?.vouchers ?? {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      13: 0,
    };
    console.log("vouchersOfUser : ", JSON.stringify(vouchersOfUser));
    let updatedVouchers = { ...vouchersOfUser };
    updatedVouchers[voucherType] = vouchersOfUser[voucherType] - voucherAmount;
    console.log(
      "update내역 : ",
      JSON.stringify({
        ...userInfo,
        vouchersInDetail: { ...updatedVouchersInDetailOfUser },
        vouchers: { ...updatedVouchers },
        isOldUser: true,
      })
    );
    const updatedUserInfo = await userService.updateUser({
      ...userInfo,
      vouchersInDetail: { ...updatedVouchersInDetailOfUser },
      vouchers: { ...updatedVouchers },
      isOldUser: true,
    });
    return updatedUserInfo;
  } catch (error) {
    console.error("Error in processVoucherConsumption:", error);
    throw error;
  }
}
async function consumeVoucher(
  voucher,
  voucherAmountToBeUsed,
  userInfo,
  prevOrderId,
  updatedVouchersInDetailOfUser
) {
  const [
    amount,
    _, 
    __, 
    productId,
    orderId,
    purchaseDate,
    ___, 
    ____, 
    purchaseToken,
    packageName,
    ...rest
  ] = voucher;
  const isApp =
    packageName?.split(".")?.length === 3 &&
    packageName?.split(".")?.[0] === "com" &&
    productId?.split("_")?.[0] === "cosmos";
  const amountToUse = Math.min(amount, voucherAmountToBeUsed);
  console.log(`Consuming ${amountToUse} from current voucher`);
  voucher[0] -= amountToUse;
  voucherAmountToBeUsed -= amountToUse;
  if (voucher[0] <= 0) {
    console.log(
      "Voucher fully consumed or amount is zero or negative, removing from array"
    );
  }
  if (isApp) {
    console.log("Processing in-app purchase consumption");
    prevOrderId = await processInAppPurchaseConsumption(
      packageName,
      productId,
      purchaseToken,
      userInfo,
      prevOrderId,
      orderId
    );
  }
  const matchingVouchers = Object.values(updatedVouchersInDetailOfUser)
    ?.flatMap((vouchers) => vouchers)
    ?.filter((elem) => elem[4] === orderId);
  const allMatchingVouchersConsumed = matchingVouchers.every(
    (elem) => elem[0] <= 0
  );
  const chargeInDB = await chargeService.getChargeByOrderId(orderId);
  if (
    allMatchingVouchersConsumed &&
    chargeInDB !== undefined &&
    chargeInDB !== null
  ) {
    console.log("All matching vouchers consumed. Deleting charge from DB.");
    await chargeService.deleteChargeByOrderId(orderId);
  }
  return { voucherAmountToBeUsed, prevOrderId };
}
module.exports = processVoucherConsumption;
