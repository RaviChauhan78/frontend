import axios from 'axios';
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your base URL
});

// Add request interceptor to set Authorization header from local storage
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('AccessToken'); // Replace 'accessToken' with your actual token key
//     if (token && config.includeAuthorization !== false) {
//       config.headers['Authorization'] = `${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add response interceptor to handle unauthorized responses
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem('id');
      localStorage.removeItem('AccessToken');
      window.location.href = '/signin'; // Replace '/signin' with your desired URL
    }
    return Promise.reject(error);
  }
);

export default instance;
