import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountryList from './components/CountryList'

const App = () => {
  const [searchFilter, setSearchFilter] = useState('')
  const [countryList, setCountryList] = useState([])
  const [searchedCountry, setSearchedCountry] = useState(null)

  const countryUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/"

  useEffect(() => {
    // Grabbing the valid country names
      axios.get('http://localhost:3001/countries')
      .then(response => {
        setCountryList(response.data)
  })
    }, [])

  const handleFindOnChange = (event) => {
    setSearchFilter(event.target.value)
  }
  
  const getFilteredCountries = () => {
    if (!searchFilter || searchFilter.length === 0)
    {
      return <p>Type into the box to find countries</p>
    }
    else
    {      
      // Direct matching
      let matchingCountry = countryList.find(country => country.name.toLowerCase() === searchFilter.toLowerCase())
      if (matchingCountry != undefined)
      {
        if (searchedCountry != null && searchedCountry.name.common.toLowerCase() == searchFilter.toLowerCase())
        {
          return <Country countryInfo={searchedCountry} />
        }
        
        getCountryData(matchingCountry.name);
        return <p>Fetching country data...</p>
      }
      
      let containing = countryList.filter(country => country.name.toLowerCase().includes(searchFilter.toLowerCase()))
      if (containing.length === 0)
      {
        return <p>No countries contain the current filter</p>
      }
      else if (containing.length === 1)
      {
        if (searchedCountry != null && searchedCountry.name.common.toLowerCase().includes(searchFilter.toLowerCase()))
        {
          return <Country countryInfo={searchedCountry} />
        }

        getCountryData(containing[0].name)
        return <p>Fetching country data...</p>
      }
      else if (containing.length > 10)
      {
        return <p>Too many matches, specify another filter</p>
      }
      else
      {
        return <CountryList countryList={containing} searchFilterFunc={setSearchFilter} />
      }
    }
  }

  const getCountryData = (countryName) =>
  {
    axios.get(`${countryUrl}${countryName}`)
      .then(countryResponse => {
        setSearchedCountry(countryResponse.data)
      })
      .catch(error => console.log('Error when getting country:', error))
  }

  return (
    <div>
      find countries <input onChange={handleFindOnChange}></input>
      {getFilteredCountries()}
    </div>
  )
}

export default App