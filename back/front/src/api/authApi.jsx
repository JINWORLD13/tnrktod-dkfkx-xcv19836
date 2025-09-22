import { apiModule } from './api.jsx';
import axios from 'axios';
export const authApi = {
  logIn: async () => {
    const { api } = apiModule();
    return await api
      .get('/auth/google/sign')
      .then(res => {
        return res?.data?.data;
      })
      .catch(error => {
        if (!axios.isCancel(error)) {
          console.error('Error:', error);
          if (window.confirm('Please try again. Failed to log in.')) {
            window.location.reload();
          } else {
            console.error('Login Error:', error);
            throw error;
          }
        } else {
          console.error('Login Error:', error);
        }
      });
  },
  logOut: async () => {
    const { api } = apiModule();
    return await api
      .get('/auth/google/logout')
      .then(res => {
        return res?.data?.data;
      })
      .catch(error => {
        if (!axios.isCancel(error)) {
          console.error('Error:', error);
          if (window.confirm('Please try again. Failed to log out.')) {
            window.location.reload();
          } else {
            console.error('Logout Error:', error);
            throw error;
          }
        } else {
          console.error('Logout Error:', error);
        }
      });
  },
};
