import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'pt_br'
      },
      timeout: 5000 
    });
    
    if (response.data.cod !== 200) {
      throw new Error(response.data.message || 'Cidade não encontrada');
    }
    
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Erro ao conectar com a API'
    );
  }
};

export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'pt_br'
      },
      timeout: 5000
    });

    if (response.data.cod !== "200") {
      throw new Error(response.data.message || 'Erro ao buscar previsão');
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Erro ao conectar com a API'
    );
  }
};

