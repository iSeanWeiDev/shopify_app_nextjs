import axios from 'axios';
require('dotenv').config();

class AxiosRequest {
  constructor(shopName, accessToken) {
    this.BASE_URL = 'https://dull-shrimp-16.loca.lt';
    this.opts = {
      headers: {
        shopName,
        accessToken
      }
    };
  }

  async get(endpoint, params) {
    try {
      const response = await axios.get(endpoint, this.opts);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint, payload) {
    try {
      const response = await axios.post(endpoint, payload, this.opts);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async patch(endpoint, payload) {
    try {
      const response = await axios.patch(endpoint, payload, this.opts);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint, payload) {
    try {
      const response = await axios.patch(endpoint, payload, this.opts);

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default AxiosRequest;
