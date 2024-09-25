import axios from 'axios';

export const getRates = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}?apikey=${import.meta.env.VITE_API_KEY}&symbols=CAD,IDR,JPY,CHF,EUR,GBP`);

    return response.data;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    
    return null;
  }
};
