// import { paths } from '@/constants/paths';
// import axiosInstance from './axios';
// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"


// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


// function jwtDecode(token: string) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(
//     window
//       .atob(base64)
//       .split('')
//       .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
//       .join('')
//   );

//   return JSON.parse(jsonPayload);
// }


// export const isValidToken = (accessToken: string) => {
//   if (!accessToken) {
//     return false;
//   }

//   const decoded = jwtDecode(accessToken);

//   const currentTime = Date.now() / 1000;

//   return decoded.exp > currentTime;
// };


// export const tokenExpired = (exp: number) => {
//   // eslint-disable-next-line prefer-const
//   let expiredTimer;

//   const currentTime = Date.now();

//   // Test token expires after 10s
//   // const timeLeft = currentTime + 10000 - currentTime; // ~10s
//   const timeLeft = exp * 1000 - currentTime;

//   clearTimeout(expiredTimer);

//   expiredTimer = setTimeout(() => {
//     alert('Token expired');


//     window.location.href = paths.logout;
//   }, timeLeft);
// };

// // ----------------------------------------------------------------------

// export const setSession = (accessToken: string | null) => {
//   if (accessToken) {
//     sessionStorage.setItem('hrmsAccessToken', accessToken);

//     axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//     // This function below will handle when token is expired
//     const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
//     tokenExpired(exp);
//   } else {
//     sessionStorage.removeItem('hrmsAccessToken');

//     delete axiosInstance.defaults.headers.common.Authorization;
//   }
// };
// const getAccessForMenu = (menuAccessName: any, accessList: any) => {
//   let accessObject = {
//     create: false,
//     read: false,
//     update: false,
//     delete: false,
//   };
  
//   const index = accessList?.findIndex((item: any) => item.menuAccessName === menuAccessName);
//   if (index !== -1) {
//     accessObject = accessList[index];
//   }

//   return accessObject;
// };
// export const getSystemAuthenticatedStatus = (accessToken: any, accessList: any) => isValidToken(accessToken) && accessList?.length > 0;

// export default getAccessForMenu;

