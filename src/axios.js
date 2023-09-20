import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://thoughtful-ant-sweatsuit.cyclic.cloud/api', 
});

export default instance;