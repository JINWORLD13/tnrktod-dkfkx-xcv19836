const checkViolationInGoogleInAppRefund = (res, userInfo) => {
  const limitedCountOfViolations = 3;
  const violations = structuredClone(userInfo?.violationsInDetail) || [];
  if (violations.length >= limitedCountOfViolations) {
    const googleRefundViolations = violations?.filter(
      elem => elem[0] === "GoogleInAppRefund"
    );
    if (googleRefundViolations.length >= limitedCountOfViolations) {
      res.status(500).json({ 
        success: false, 
        message: "violated in GoogleInAppRefund" 
      });
      return true; 
    }
  }
  return false; 
};
module.exports = {
  checkViolationInGoogleInAppRefund,
};
