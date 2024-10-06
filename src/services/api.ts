import axios from 'axios';

const API_BASE_URL = 'https://api.unsplash.com';
const ACCESS_KEY = '6X4WLepf0_G668B9gwgLLwfNzTyKEQTA3BCZtNExoIE';

const unsplashApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

// Fetch images based on query
export const fetchImages = async (query: string = '', perPage: number = 18) => {
  try {
    const response = await unsplashApi.get('/search/photos', {
      // Use /search/photos endpoint
      params: {
        query,
        order_by: 'latest', // Order results by latest
        per_page: perPage,
      },
    });
    // console.log('Hi: ', response);
    return response.data.results; // Return the results array
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; // Propagate the error for handling in components
  }
};
