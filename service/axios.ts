// import { HOST_API } from '@/config-global';
// import axios from 'axios';

// const axiosInstance = axios.create({ baseURL: HOST_API });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error.response?.status);
//     if (error.response?.status === 401) {
//       // eslint-disable-next-line prefer-promise-reject-errors
//       return Promise.reject('Session expired')
//     }
//     return Promise.reject((error.response && error.response.data) || 'Something went wrong')
//   }
// );

// export default axiosInstance;
