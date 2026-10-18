const CityWeather = ({ data }) => {
    const getWeatherIcon = () => {
        if (data?.weatherData?.weather?.length > 0)
        {
            let weather = data.weatherData.weather[0]
            return (
                <>
                <p>{weather.main}</p>
                <img src={`https://openweathermap.org/payload/api/media/file/${weather.icon}.png`} />
                </>
            )
        }
        return null;
    }

    return (
        <>
            <h3>Weather info for {data.capitalName}</h3>
            <p><b>Temperature:</b> {data?.weatherData?.main?.temp}℉</p>
            <p><b>Feels like:</b> {data?.weatherData?.main?.feels_like}℉</p>
            {getWeatherIcon()}
            <p><b>Wind:</b> {data?.weatherData?.wind?.speed} mph</p>
        </>
    )
}

export default CityWeather