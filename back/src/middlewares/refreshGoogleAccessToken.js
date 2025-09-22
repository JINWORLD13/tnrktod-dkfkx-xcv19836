import axios from "axios";
export const refreshGoogleAccessToken = async (googleRefreshToken) => {
    try {
      const response = await axios.post(process.env.GOOGLE_TOKEN_URL, {
        grant_type: 'refresh_token',
        refresh_token: googleRefreshToken,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      });
      const newAccessToken = response.data.access_token;
      return newAccessToken;
    } catch (error) {
      error.name = commonErrors.refreshGoogleAccessTokenError;
      throw error;
    }
  }
