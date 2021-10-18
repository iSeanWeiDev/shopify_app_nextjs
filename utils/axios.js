import axios from 'axios';
require('dotenv').config();

class AxiosRequest {
  constructor(shopName, accessToken) {
    this.BASE_URL = 'https://stale-crab-55.loca.lt';
    this.opts = {
      headers: {
        shopname: shopName,
        accesstoken: accessToken
      }
    };
  }

  async get(endpoint, params) {
    try {
      const response = await axios.get(`${this.BASE_URL}${endpoint}`, this.opts);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint, payload) {
    try {
      const response = await axios.post(`${this.BASE_URL}${endpoint}`, payload, this.opts);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch(endpoint, payload) {
    try {
      const response = await axios.patch(`${this.BASE_URL}${endpoint}`, payload, this.opts);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint, payload) {
    try {
      const response = await axios.delete(endpoint, this.opts);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AxiosRequest;
