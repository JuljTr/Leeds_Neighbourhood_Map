export function getWeatherData(lat, lon, timezone) {
    return axios.get("https://api.open-meteo.com/v1/forecast?latitude=53.80&longitude=-1.55&hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=Europe%2FLondon", {
        params: {
            latitude: lat,
            longitude: lon,
            timezone
        },
    }).then(({ data }) => {
        return {
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data)
        }
    })
}

function parseCurrentWeather({ current_weather, daily }) {
    const { temperature: currentTemp, weathercode: iconCode } = current_weather
    const { temperature_2m_max: [maxTemp]} = daily
    return {
        currentTemp: Math.round(currentTemp),
        iconCode
    }
}

function parseDailyWeather({ daily }) {
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temperature_2m_max[index])
        }
    })
}

