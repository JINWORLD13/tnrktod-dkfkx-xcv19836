export const checkViolationInGoogleInAppRefund = (userInfo) => {
  const limitedCountOfViolations = 3;
  let violationsArr = userInfo?.violationsInDetail || [];
  if (violationsArr?.length >= limitedCountOfViolations) {
    const filteredArr = violationsArr?.filter(
      elem => elem[0] === 'GoogleInAppRefund'
    );
    if (filteredArr?.length >= limitedCountOfViolations) {
      return <div>You are violated.</div>;
    }
  }
};
