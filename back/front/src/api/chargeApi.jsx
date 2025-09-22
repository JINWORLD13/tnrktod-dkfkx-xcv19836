import { Capacitor } from '@capacitor/core';
import { getAccessToken, getRefreshToken } from '../utils/tokenCookie.jsx';
import {
  getAccessTokenForPreference,
  getRefreshTokenForPreference,
} from '../utils/tokenPreference.jsx';
const isNative = Capacitor.isNativePlatform();
const getAccessToken2 = async () => {
  if (isNative) {
    return await getAccessTokenForPreference();
  } else {
    return getAccessToken();
  }
};
const getRefreshToken2 = async () => {
  if (isNative) {
    return await getRefreshTokenForPreference();
  } else {
    return getRefreshToken();
  }
};
import { apiWithTokensModule } from './api.jsx';
import axios from 'axios';
export const chargeApi = {
  postPrePaymentForToss: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.post('/charge/toss/pre-payment', {
        ...form,
      });
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', JSON.stringify(error));
        if (
          window.confirm(
            'Network error occurred. Failed to post PrePaymentForToss.'
          )
        ) {
          window.location.reload();
        } else {
          console.error('postPrePaymentForToss Error:', JSON.stringify(error));
        }
      } else {
        console.error('postPrePaymentForToss Error:', JSON.stringify(error));
      }
      return { response: null, cleanup };
    }
  },
  getPrePaymentForToss: async () => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.get('/charge/toss/pre-payment');
      return { response: res.data.chargeInfo, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', JSON.stringify(error));
        if (
          window.confirm(
            'Network error occurred. Failed to get PrePaymentForToss.'
          )
        ) {
          window.location.reload();
        } else {
          console.error('getPrePaymentForToss Error:', JSON.stringify(error));
        }
      } else {
        扇.error('getPrePaymentForToss Error:', JSON.stringify(error));
      }
      return { response: null, cleanup };
    }
  },
  getPrePaymentForTossByOrderId: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.get(
        `/charge/toss/pre-payment?orderId=${form?.orderId}`
      );
      return { response: res.data.chargeInfo, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', JSON.stringify(error));
        if (
          window.confirm(
            'Network error occurred. Failed to get PrePaymentForTossByOrderId.'
          )
        ) {
          window.location.reload();
        } else {
          console.error(
            'getPrePaymentForTossByOrderId Error:',
            JSON.stringify(error)
          );
        }
      } else {
        console.error(
          'getPrePaymentForTossByOrderId Error:',
          JSON.stringify(error)
        );
      }
      return { response: null, cleanup };
    }
  },
  deletePrePaymentForTossByOrderId: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.delete('/charge/toss/pre-payment', {
        data: { orderId: form?.orderId },
      });
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', JSON.stringify(error));
        if (
          window.confirm(
            'Network error occurred. Failed to delete PrePaymentForTossByOrderId.'
          )
        ) {
          window.location.reload();
        } else {
          console.error(
            'deletePrePaymentForTossByOrderId Error:',
            JSON.stringify(error)
          );
        }
      } else {
        console.error(
          'deletePrePaymentForTossByOrderId Error:',
          JSON.stringify(error)
        );
      }
      return { response: null, cleanup };
    }
  },
  deletePrePaymentForTossByPaymentKey: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.delete(
        '/charge/toss/pre-payment/paymentKey',
        {
          data: { paymentKey: form?.paymentKey },
        }
      );
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', JSON.stringify(error));
        if (
          window.confirm(
            'Network error occurred. Failed to delete PrePaymentForTossByPaymentKey.'
          )
        ) {
          window.location.reload();
        } else {
          console.error(
            'deletePrePaymentForTossByPaymentKey Error:',
            JSON.stringify(error)
          );
        }
      } else {
        console.error(
          'deletePrePaymentForTossByPaymentKey Error:',
          JSON.stringify(error)
        );
      }
      return { response: null, cleanup };
    }
  },
  putPrePaymentForToss: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.put('/charge/toss/pre-payment', {
        ...form,
      });
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', JSON.stringify(error));
        if (
          window.confirm(
            'Network error occurred. Failed to put PrePaymentForToss.'
          )
        ) {
          window.location.reload();
        } else {
          console.error('putPrePaymentForToss Error:', JSON.stringify(error));
        }
      } else {
        console.error('putPrePaymentForToss Error:', JSON.stringify(error));
      }
      return { response: null, cleanup };
    }
  },
  postPaymentForToss: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.post('/charge/toss/payment/confirm', {
        ...form,
      });
      return { response: res, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', JSON.stringify(error));
        if (
          window.confirm(
            'Network error occurred. Failed to post PaymentForToss.'
          )
        ) {
          window.location.reload();
        } else {
          console.error('postPaymentForToss Error:', JSON.stringify(error));
        }
      } else {
        console.error('postPaymentForToss Error:', JSON.stringify(error));
      }
      return { response: null, cleanup };
    }
  },
  postPartialCancelForToss: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.post('/charge/toss/payment/cancel/part', {
        ...form,
      });
      return { response: res, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', JSON.stringify(error));
        if (
          window.confirm(
            'Network error occurred. Failed to post PartialCancelForToss.'
          )
        ) {
          window.location.reload();
        } else {
          console.error(
            'postPartialCancelForToss Error:',
            JSON.stringify(error)
          );
        }
      } else {
        console.error('postPartialCancelForToss Error:', JSON.stringify(error));
      }
      return { response: null, cleanup };
    }
  },
  postPaymentForGooglePlayStore: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.post(
        '/charge/iap/google-play-store/payment',
        form
      );
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', JSON.stringify(error));
        console.error(
          'postPaymentForGooglePlayStore Error:',
          JSON.stringify(error)
        );
      } else {
        console.error(
          'postPaymentForGooglePlayStore Error:',
          JSON.stringify(error)
        );
      }
      return { response: null, cleanup };
    }
  },
  getPurchaseLimit: async (form) => {
     const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.get(
        `/charge/purchaseLimit?productId=${form?.productId}`
      );
      return { response: res.data.purchaseLimit, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', JSON.stringify(error));
        if (
          window.confirm(
            'Network error occurred. Failed to get PrePaymentForTossByOrderId.'
          )
        ) {
          window.location.reload();
        } else {
          console.error(
            'getPrePaymentForTossByOrderId Error:',
            JSON.stringify(error)
          );
        }
      } else {
        console.error(
          'getPrePaymentForTossByOrderId Error:',
          JSON.stringify(error)
        );
      }
      return { response: null, cleanup };
    }
  }
};
