import axios from 'axios';

const API_BASE_URL = 'https://api.unsplash.com';
const ACCESS_KEY = '6X4WLepf0_G668B9gwgLLwfNzTyKEQTA3BCZtNExoIE';

const unsplashApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const fetchImages = async (query: string = '', perPage: number = 8) => {
  try {
    const response = await unsplashApi.get('/photos', {
      params: {
        query,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; // Propagate the error for handling in components
  }
};
