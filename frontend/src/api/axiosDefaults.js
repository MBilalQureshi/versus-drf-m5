/*
Your code is now set up so that you can follow along with what you learned in the Moments walkthrough. 
There is one final difference between the Moments walkthrough setup and what you will need for this combined workspace. 
That is you will not need the BaseURL setting in the axiosDefaults.js file when it is created. 
This is because the combined workspace will receive the JSON from the API from the same URL,
 just on a different port (which was set with the proxy above).

// IMPORTANT!!
 // Because this React app is running in the same workspace as the API,

 // there is no need to set a separate baseURL until you reach deployment.

 // Setting a baseURL before you reach deployment will cause errors
*/

import axios from 'axios';
// as this is the type of data our API will be expecting, and multipart because there is images other than text
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// To avoid CORS errors while sending cookies
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export const axiosRes = axios.create();

export const axiosReq = axios.create();