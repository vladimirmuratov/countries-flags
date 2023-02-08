import {IoArrowBack} from "react-icons/io5";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {searchByCountry} from "../config";
import {Button} from "../components/Button";
import {Info} from "../components/Info";

export const DetailsPage = () => {
    const navigate = useNavigate()
    const {name} = useParams()
    const [country, setCountry] = useState(null)

    useEffect(() => {
        axios.get(searchByCountry(name)).then(({data}) => setCountry(data[0]))
    }, [name])

    return (
        <div>
            <Button onClick={() => navigate(-1)}>
                <IoArrowBack/>Back
            </Button>
            {country && <Info navigate={navigate} {...country}/>}
        </div>
    )
}
