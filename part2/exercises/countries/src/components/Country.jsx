import { useState, useEffect } from 'react'
import axios from 'axios'
import CityWeather from './CityWeather'

const Country= ({ countryInfo }) => {
    const [capitalWeather, setCapitalWeather] = useState([])
    const weatherApiKey = import.meta.env.VITE_OPEN_WEATHER_KEY
    const weatherDataEndpoint = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherApiKey}&units=imperial`
    const geoLocationEndpoint = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherApiKey}&units=imperial`

    useEffect(() => {
        if (countryInfo?.capital && weatherApiKey)
        {
            if (countryInfo.capital.length === 1 && countryInfo.capitalInfo?.latlng)
            {
                // Only make a request to the endpoint if we don't already have it
                if (capitalWeather?.findIndex(capital => capital.capitalName.toLowerCase() === countryInfo.capital[0].toLowerCase()) === -1)
                {
                    axios.get(`${weatherDataEndpoint}&lat=${countryInfo.capitalInfo.latlng[0]}&lon=${countryInfo.capitalInfo.latlng[1]}`)
                    .then(response => {
                        let newEntry = {
                            "capitalName" : countryInfo.capital[0],
                            "weatherData" : response.data
                        }
                        setCapitalWeather(capitalWeather.concat(newEntry))
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            }
            else // either missing latlng info or multiple capitals
            {
                // This could theoretically be used for the single query done up above.
                // However, openweather has noted that the geolocation API is deprecated and not receiving updates
                Promise.allSettled(countryInfo.capital.filter(capital => capitalWeather?.findIndex(c => c.capitalName.toLowerCase() === capital.toLowerCase()) === -1)
                    .map(capital => axios.get(`${geoLocationEndpoint}&q=${capital},${countryInfo?.ccn3}`)))
                    .then(results => {
                        let newCapitalInfoArray = []
                        results.forEach(response => {
                            if (response.status === 'fulfilled')
                            {
                                let newCapitalInfo = {
                                    "capitalName" : response.value.data.name,
                                    "weatherData" : response.value.data
                                }
                                newCapitalInfoArray.push(newCapitalInfo)
                            }
                            else
                            {
                                console.log(response.reason)
                            }
                        })
                        if (newCapitalInfoArray.length > 0)
                        {
                            setCapitalWeather(capitalWeather.concat(newCapitalInfoArray))
                        }
                    })
            }
        }
    }, [])

    const getStandardPageEntry = (title, value) => {
        return <p><b>{title}</b> {value}</p>
    }

    const getCountryName = () => {
        if (countryInfo && countryInfo?.name?.common)
        {
            return <h1>{countryInfo.name.common} {countryInfo.flag != null ? countryInfo.flag : ''}</h1>
        }
        else
        {
            return null
        }
    }

    const getCapitalNames = () => {
        if (countryInfo && countryInfo.capital)
        {
            let capitalText = countryInfo.capital.length === 1 ? 'Capital:' : 'Capitals:'
            return getStandardPageEntry(capitalText, countryInfo.capital.join(', '))
        }
        
        return <p>Could not determine Capital info</p>
    }

    const getPopulation = () => {
        if (countryInfo && countryInfo.population)
        {
            return getStandardPageEntry('Population:', countryInfo.population)
        }

        return <p>Could not determine Population info</p>
    }

    const getArea = () => {
        if (countryInfo && countryInfo.area)
        {
            return getStandardPageEntry('Area:', countryInfo.area)
        }

        return <p>Could not determine Area info</p>
    }

    const getLanguages = () => {
        if (countryInfo && countryInfo.languages)
        {
            return (
                <>
                <h2>Languages:</h2>
                <ul>
                    {Object.entries(countryInfo.languages).map(([key, value]) => <li key={key}>{value}</li>)}
                </ul>
                </>
            )
        }
        
        return <p>Could not determine Languages</p>
    }

    const getFlag = () => {
        if (countryInfo && countryInfo.flags && countryInfo.flags.png)
        {
            return (
                <>
                <h2>Flag</h2>
                <img src={countryInfo.flags.png} alt={`An image of the flag of ${countryInfo.name.common}`} />
                </>
            )
        }
        
        return <p>Could not display flag</p>
    }

    const getWeatherInfo = () => {
        if (capitalWeather.length === 0) return null;
        return capitalWeather.map(data => <CityWeather key={data.capitalName} data={data}/>)
    }

    
    return (
        <div>
            {getCountryName()}
            {getCapitalNames()}
            {getPopulation()}
            {getArea()}
            {getLanguages()}
            {getFlag()}
            {getWeatherInfo()}
        </div>
    )

}

export default Country