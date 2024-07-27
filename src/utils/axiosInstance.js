import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = sessionStorage.getItem('refreshToken');
//       if (refreshToken) {
//         try {
//           const response = await axios.post(`${API_URL}/api/user/refresh-token`, { token: refreshToken });
//           if (response.status === 200) {
//             const { accessToken } = response.data;
//             sessionStorage.setItem('accessToken', accessToken);
//             axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//             return axiosInstance(originalRequest);
//           }
//         } catch (refreshError) {
//           console.error('Token refresh failed:', refreshError);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
