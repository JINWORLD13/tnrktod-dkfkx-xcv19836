const { userService } = require("../MVC/service");
const getGoogleToken = {
  getGoogleAccessToken: async (userId) => {
    try {
      const user = await userService.getUserById(userId);
      const accessToken = user.accessToken;
      return accessToken;
    } catch (err) {
      throw err;
    }
  },
  getGoogleRefreshToken: async (userId) => {
    try {
      const user = await userService.getUserById(userId);
      const refreshToken = user.refreshToken;
      return refreshToken;
    } catch (err) {
      throw err;
    }
  },
};
module.exports = getGoogleToken;
