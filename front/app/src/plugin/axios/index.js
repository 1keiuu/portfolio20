import axios from 'axios';

const AXIOS = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

export default AXIOS;
