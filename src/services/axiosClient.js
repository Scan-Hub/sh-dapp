import axios from 'axios';
import queryString from 'query-string';

import { history ,  LocalStorageService } from "../_helpers/";
const localStorageService = LocalStorageService.getService();

const defaultHeader = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  //'versionapp': localStorage.getItem("versionapp") || '1.0.0',
  // 'clientid': process.env.REACT_APP_CLIENT_ID,
  // 'hashcode': process.env.REACT_APP_CLIENT_HASH,
  // 'versionos': osVersion + ' ' + osName,
  // 'devicename': deviceName

}

// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
  
  failedQueue = [];
}

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  //headers: defaultHeader,
  paramsSerializer: params => queryString.stringify(params),
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  config => {

      const token = localStorageService.getAccessToken();
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
      }

      return config;

  },error => {
      Promise.reject(error)
  });

//Add a response interceptor
axiosClient.interceptors.response.use( (response) => {
 return handleResponse(response)
},  (error) => {
  
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {

      console.log("HET^! TOKEN ")
         
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosClient.request(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorageService.getRefreshToken();

     return new Promise(function (resolve, reject) {
      axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/refresh-token`, { refreshToken },{
        headers: defaultHeader
      }).then((res) => {

          console.log("refreshToken ------------------------")

          const {data} = res.data;

         // 1) put token to LocalStorage
          localStorageService.setToken(data);

          // 2) Change Authorization header
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
          originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;

          processQueue(null, data.accessToken);

          // 3) return originalRequest object with Axios
          resolve(axiosClient.request(originalRequest));

       })
       .catch((err) => {

            const { status ,data } = err.response;

            if(status === 404){
              console.log("err.status === 404")
              clearAuthToken()
            }if( data && ( data.error.errorCode === "REFRESH_TOKEN_INVALID" ) ){
              clearAuthToken()
            }

            processQueue(err, null);
            reject(err);
       })
       .finally(() => { 
         isRefreshing = false 
        })
      })

  }

  return Promise.reject(handleError(error)) ;

});


const handleResponse = (res) =>{

  if (res && res.data) {
    return res.data;
  }

  return res;

}

const handleError = (error)  => {

  const { data } = error.response;

  if( data && (data.error_code === "USER_LOCKED_USING") ){
    clearAuthToken()
  }

  return data;

}

const clearAuthToken = () =>{
  LocalStorageService.clearToken();
  history.push('/');
}

export default axiosClient;