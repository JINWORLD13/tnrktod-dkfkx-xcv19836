const areObjectsEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  keys1.sort();
  keys2.sort();
  for (let i = 0; i < keys1.length; i++) {
    if (keys1[i] !== keys2[i]) {
      return false;
    }
  }
  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (val1.length !== val2.length) {
        return false;
      }
      for (let i = 0; i < val1.length; i++) {
        if (
          typeof val1[i] === "object" &&
          val1[i] !== null &&
          typeof val2[i] === "object" &&
          val2[i] !== null
        ) {
          if (!areObjectsEqual(val1[i], val2[i])) {
            return false;
          }
        } else if (val1[i] !== val2[i]) {
          return false;
        }
      }
    }
    else if (
      typeof val1 === "object" &&
      val1 !== null &&
      typeof val2 === "object" &&
      val2 !== null
    ) {
      if (!areObjectsEqual(val1, val2)) {
        return false;
      }
    }
    else if (val1 !== val2) {
      return false;
    }
  }
  return true;
};
module.exports = areObjectsEqual;
