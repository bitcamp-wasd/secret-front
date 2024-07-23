import { jwtDecode } from 'jwt-decode';

export const getUserRoleFromToken = () => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.role; // JWT에 저장된 사용자 역할
  }
  return null;
};