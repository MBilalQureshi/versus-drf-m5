import axios from 'axios'
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
export const axiosRes = axios.create();
export const axiosReq = axios.create();