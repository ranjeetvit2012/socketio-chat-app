import axios from 'axios';
import { BASE_URL } from './config';
import toast from 'react-hot-toast';
export const apiCall = async (method, url, data = "", headData = "") => {

    try {
  
      const userInfo = JSON.parse(localStorage.getItem('getToken'))
      const config = { 'authorization': `Bearer ${userInfo?.token}` }
      // const config = {'authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoicmFuamVldCJ9LCJpYXQiOjE2OTQ1MDQzNzgsImV4cCI6MTY5OTY4ODM3OH0.1um5SlVk7Wl_dlQElFpHQBOSZ8Luu20_eDrK79GylSQ' }
      const finalUrl = BASE_URL + url;
      const apiRes = await axios({
        method: method,
        url: finalUrl,
        data: data,
        headers: headData ? config : null,
      });
  
      if (apiRes) {
        return apiRes;
      }
  
    } catch (error) {
      console.log("error?.response?.data?. -------------------------", error?.response?.data);
      let errorData
      if (error) {
        if (error?.response?.data?.status == 401) {
          toast.error(error?.response?.data?.message);
          errorData = {
            message: error?.response?.data?.message,
            status: error?.response?.data?.status,
          }
        }
        if (error?.response?.data?.status == 400) {
          toast.error(error?.response?.data?.message);
          errorData = {
            message: error?.response?.data?.message,
            status: error?.response?.data?.status,
          }
        }
        if (error?.response?.data?.status == 403) {
          toast.error(error?.response?.data?.message);
          errorData = {
            message: error?.response?.data?.message,
            status: error?.response?.data?.status,
          }
        }
        console.log(" error.code ----------", error.code)
        if (error.code == 'ERR_NETWORK') {
          toast.error(error?.message);
          errorData = {
            message: error?.message,
            status: 500,
          }
        }
      }
  
      return errorData
  
    }
   
  }