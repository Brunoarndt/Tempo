export function getBackgroundImage(condition, isDaytime) {
  const conditionMap = {
    Clear: 'clear',
    Clouds: 'cloudy',
    Rain: 'rainy',
    Drizzle: 'rainy',
    Thunderstorm: 'rainy',
    Snow: 'snowy',
    Mist: 'foggy',
    Fog: 'foggy',
    Haze: 'foggy',
    Smoke: 'foggy',
  };

  const simplified = conditionMap[condition] || 'default';
  const time = isDaytime ? 'day' : 'night';

  return `/backgrounds/${simplified}-${time}.png`;
}
