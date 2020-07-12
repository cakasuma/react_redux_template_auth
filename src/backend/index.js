import axios from "axios";

const getBackendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
const API = (() => {
  return {
    get: (path, param) => axios.get(`${getBackendUrl}${path}`, param),
    delete: (path, param) => axios.delete(`${getBackendUrl}${path}`, param),
    post: (path, param) => axios.post(`${getBackendUrl}${path}`, param),
    put: (path, param) => axios.put(`${getBackendUrl}${path}`, param),
  };
})();

export default API;