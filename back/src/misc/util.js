function sanitizeObject(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined) {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}
function buildResponse(data, error, statusCode) {
  return {
    data, 
    errorName: error?.name ?? null,
    errorMessage: error?.message ?? null,
    statusCode: statusCode ?? error?.statusCode
  };
}
module.exports = {
  sanitizeObject,
  buildResponse,
};
