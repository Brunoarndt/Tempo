import dayjs from "dayjs";
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export const formattedForecastData = (forecastList) => {
  const dailyData = {};

  forecastList.forEach((item) => {
    const date = dayjs(item.dt_txt).format('YYYY-MM-DD');
    const hour = dayjs(item.dt_txt).hour();
    const temp = item.main.temp;
    const icon = item.weather?.[0]?.icon || '';  

    if (!dailyData[date]) {
      dailyData[date] = {
        temps: [],
        icons: [],
      };
    }

    if (hour >= 6 && hour <= 18 && icon) {
      dailyData[date].icons.push(icon);
    }

    dailyData[date].temps.push(temp);
  });

  const result = Object.entries(dailyData)
    .slice(0, 5)
    .map(([date, data]) => {
      const min = Math.round(Math.min(...data.temps));
      const max = Math.round(Math.max(...data.temps));

      const iconCount = data.icons.reduce((acc, icon) => {
        acc[icon] = (acc[icon] || 0) + 1;
        return acc;
      }, {});

      const predominantIcon = Object.entries(iconCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '01d';

      return {
        date: dayjs(date).format('dddd, DD'),
        min,
        max,
        icon: predominantIcon,
      };
    });

  return result;
};
