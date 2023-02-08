import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Controls} from "../components/Controls";
import {List} from "../components/List";
import {Card} from "../components/Card";
import {useEffect, useState} from "react";
import {ALL_COUNTRIES} from "../config";

export const HomePage = ({countries, setCountries}) => {
    const [filteredCountries, setFilteredCountries] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!countries.length) {
            axios.get(ALL_COUNTRIES).then(({data}) => setCountries(data))
        } else {
            setFilteredCountries(countries)
        }
    }, [countries])

    const handleSearch = (search, region) => {
        let data = [...countries]

        if (region) {
            data = data.filter(c => c.region.includes(region))
        }

        if (search) {
            data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        }

        setFilteredCountries(data)
    }

    return (
        <>
            <Controls onSearch={handleSearch}/>
            <List>
                {filteredCountries.map(c => {
                    const countryInfo = {
                        img: c.flags.png,
                        name: c.name,
                        info: [
                            {title: 'Capital', description: c.capital},
                            {title: 'Population', description: c.population.toLocaleString()},
                            {title: 'Region', description: c.region},
                        ]
                    }

                    return <Card key={c.name} {...countryInfo} onClick={() => navigate(`/country/${c.name}`)}/>
                })}
            </List>
        </>
    )
}
