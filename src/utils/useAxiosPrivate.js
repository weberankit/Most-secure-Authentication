import { axiosPrivate } from "../api/axios";
import { useContext,useEffect } from "react";
import useRefershToken from "./useRefershToken"
import AuthContext from "../context/AuthContext";

const useAxiosPrivate=()=>{
    const {auth}=useContext(AuthContext)
const refersh=useRefershToken()
useEffect(()=>{
    //adding to each reques access token if it is not avail
    //accept 2 arguments one-config which has base url and many others
    //two-error
const requestIntercept=axiosPrivate.interceptors.request.use(
    config=>{
        if(!config.headers['Authorization']){
            config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
    },
    (error)=>Promise.reject(error)
)

//for getting response it accep 2 argument
//1st-succesfule response 
//2nd error promise -this useally if token expire so the new call method to update accestoken and to add to the headers
const responseIntercept=axiosPrivate.interceptors.response.use(
response=>response,
async(error)=>{
    const prevRequest=error?.config
    if(error?.response?.status ===403 && !prevRequest?.sent){
        prevRequest.sent=true
        const newAccessToken=await refersh()
        /// Update Authorization header with the new token
        prevRequest.headers['Authorization'] =`Bearer ${newAccessToken}`
        return axiosPrivate(prevRequest)//// Resend the request with the updated headers (new token)
    }
    return Promise.reject(error)
}
)
return()=>{
    //removing interceptos otherwise it kepp adding each time
    axiosPrivate.interceptors.request.eject(requestIntercept)
    axiosPrivate.interceptors.response.eject(responseIntercept)
}

},[auth,refersh])
return axiosPrivate

}
export default useAxiosPrivate

/**  notes --how it working
 * Certainly! Let's go through the syntax used in this code, breaking down the key constructs and their respective roles. I'll cover the specific syntax and concepts employed in the interceptors and their related operations.

1. Axios Interceptor Syntax
Axios interceptors allow you to run code before a request is sent or after a response is received. This is particularly useful for adding headers (like authentication tokens) or handling errors globally.

Request Interceptor
js
Copy code
const requestIntercept = axiosPrivate.interceptors.request.use(
  config => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
axiosPrivate.interceptors.request.use(): This is the syntax for adding a request interceptor to the axiosPrivate instance.
First argument (success handler): This function is executed before the request is sent. It receives the config object, which contains details about the request (e.g., URL, headers, etc.).
config.headers['Authorization']: Here, the interceptor checks if the request already has an Authorization header. If not, it adds one using the accessToken from the auth state.
Second argument (error handler): This function is executed if an error occurs during the request. It returns a rejected promise with the error (Promise.reject(error)), which can be handled later.
Response Interceptor
js
Copy code
const responseIntercept = axiosPrivate.interceptors.response.use(
  response => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refresh();
      prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);
axiosPrivate.interceptors.response.use(): This is the syntax for adding a response interceptor to the axiosPrivate instance.
First argument (success handler): This function is called when the response is successfully received. In this case, it simply returns the response object as is.
Second argument (error handler): This function is executed if there’s an error with the response. It checks if the error status is 403 (Forbidden), which typically indicates that the token has expired. If so, it triggers a token refresh and retries the original request.
error?.response?.status === 403: This checks if the response status is 403.
prevRequest.sent = true: This flag prevents retrying the request multiple times in case of repeated token expiration errors.
await refresh(): Calls the refresh() function (from the useRefreshToken hook) to get a new access token.
axiosPrivate(prevRequest): This re-sends the original request with the updated Authorization header.
2. Ejecting Interceptors
js
Copy code
return () => {
  axiosPrivate.interceptors.request.eject(requestIntercept);
  axiosPrivate.interceptors.response.eject(responseIntercept);
};
axiosPrivate.interceptors.request.eject(): This is used to remove the request interceptor when it's no longer needed (for example, when the component is unmounted). It takes the interceptor object (requestIntercept) as an argument.
axiosPrivate.interceptors.response.eject(): Similarly, this removes the response interceptor.
 */