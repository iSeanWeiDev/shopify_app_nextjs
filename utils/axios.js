import axios from 'axios';
require('dotenv').config();

const BASE_URL = 'https://white-eel-46.loca.lt';

export const axiosPostRequest = (endpoint, data) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}${endpoint}`, data)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
