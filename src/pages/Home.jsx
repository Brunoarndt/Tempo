import { useState, useEffect } from 'react';
import { Box, Flex, Spinner, SimpleGrid, useToast } from '@chakra-ui/react';
import { fetchWeather, fetchForecast } from '../services/weatherApi.jsx';
import { formattedForecastData } from '../utils/formattedForecastData.jsx';
import { getBackgroundImage } from '../utils/getBackgroundImage.jsx';
import ForecastCard from '../components/ForecastCard.jsx';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ButtonColorMode from '../components/ButtonColorMode.jsx';


export default function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState('');
  const toast = useToast();

  const getWeather = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    try {
      const weatherData = await fetchWeather(cityName);
      const forecast = await fetchForecast(cityName);
      const formatted = formattedForecastData(forecast.list)
      setForecast(formatted);
      setWeather(weatherData);
    } catch (error) {
      toast({
        title: 'Erro',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (!weather) return;

    const condition = weather.weather[0].main;
    const currentTime = new Date((weather.dt + weather.timezone) * 1000);
    const hours = currentTime.getUTCHours();
    const isDaytime = hours >= 6 && hours < 18;

    const bg = getBackgroundImage(condition, isDaytime);
    setBackground(bg);
  }, [weather]);

  useEffect(() => {
    getWeather('Joinville');
  }, []);

  return (
    <Box minH="100vh" p={4} bgImage={`url(${background})`}>
      <ButtonColorMode />
      <Flex
        direction="column"
        align="center"
        mx="auto"
        gap={6}
        animation="gradient 15s ease infinite">
        <SearchBar onSearch={getWeather} />

        {loading ? (
          <Spinner size="xl" />
        ) :
          <><WeatherCard data={weather} />
            <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={2}>
              {forecast && forecast.map((day, index) => (
                <ForecastCard key={index} day={day} />
              ))}
            </SimpleGrid>
          </>
        }
      </Flex>
    </Box>
  );
}