const updatedVouchersInDetailMaker = ({ orderHistory, userInDB, orderId }) => {
  const keysArrOfOrderHistory = Object.keys({ ...orderHistory });
  let updatedVouchersInDetail = { ...userInDB?.vouchersInDetail };
  keysArrOfOrderHistory?.forEach((key, i) => {
    if (!updatedVouchersInDetail[key]) {
      updatedVouchersInDetail[key] = [];
    }
    updatedVouchersInDetail[key].push(orderHistory[key]);
    const lastIndex = updatedVouchersInDetail[key].length - 1;
    if (updatedVouchersInDetail[key][lastIndex][4] === orderId) {
      updatedVouchersInDetail[key][lastIndex][5] = orderHistory[key][5];
    }
  });
  return updatedVouchersInDetail
};
module.exports = updatedVouchersInDetailMaker;
