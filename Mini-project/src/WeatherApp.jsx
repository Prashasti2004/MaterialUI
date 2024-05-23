import SearchBox from "./searchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import { useState } from "react";

export default function WeatherApp(){
    const [weatherInfo, setWeatherInfo]= useState({
    city: "Chandrapur",
    Humidity: 23,
    feelsLike: 44.6,
    temp_max: 42.55,
    temp_min: 42.55,
    temperature: 42.55,
    weather: "clear sky",
    });

    let updateInfo= (newInfo) => {
        setWeatherInfo(newInfo);
    };

    return(
        <div style={{textAlign: "center"}}>
            <h2>
                Weather App
            </h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>

    );
}