import axios from 'axios';
require('dotenv').config();

class AxiosRequest {
  constructor(shopName, accessToken) {
    console.log(shopName, accessToken);
    this.BASE_URL =
      process.env.NEXT_NODE_ENV === 'development'
        ? 'https://slimy-yak-92.loca.lt'
        : 'https://fxgqrpvka7.execute-api.us-east-1.amazonaws.com/dev';

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
    console.log(this.opts);

    try {
      const response = await axios.delete(`${this.BASE_URL}${endpoint}`, payload, this.opts);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AxiosRequest;
