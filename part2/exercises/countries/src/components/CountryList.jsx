const CountryList = ({ countryList, searchFilterFunc }) => {
    return (
        <ul>
            {countryList.map(country => 
            <li key={country.id}>{country.name} <button onClick={() => searchFilterFunc(country.name)}>Show</button></li>)}
        </ul>
    )
}

export default CountryList