import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './searchBox.css'
import { useState } from "react";

export default function SearchBox({updateInfo}) {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "8b3d79a6d8d9733e213b43eeb54807a4";

    
    let getWeatherInfo = async() => {
      try{
        let response = await fetch(`${API_URL}?q=${city},${state},${country}&appid=${API_KEY}&units=metric`);
      let jsonRespone = await response.json();
      console.log(jsonRespone);
      let result ={
        city: city,
        feelsLike: jsonRespone.main.feels_like,
        Humidity: jsonRespone.main.humidity,
        temperature: jsonRespone.main.temp,
        temp_min: jsonRespone.main.temp_min,
        temp_max: jsonRespone.main.temp_max,
        weather: jsonRespone.weather[0].description,
      }
      console.log(result);
      return result;

      } catch(err){
        throw err;
      }      
    };


    let [city, setCity]= useState("");
    let [state, setState]= useState("");
    let [country, setCountry]= useState("");
    let [err, setErr] = useState(false);

    let handleChangeCity = (event) => {
       setCity(event.target.value);    
    };
    let handleChangeState = (event) => {
        setState(event.target.value);    
     };
     let handleChangeCountry = (event) => {
        setCountry(event.target.value);    
     };


    let handleSubmit = async (event) => {
       try{
        event.preventDefault();
        console.log([city, state, country]);
        setCity("");
        setState("");
        setCountry("");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
        setErr(false);

       } catch{
        setErr(true);

       }
       
    }
    return (
    <div className="searchBox">
      <h2>Search the weather of the city</h2>
      <form onSubmit={handleSubmit}>
      <TextField id="city" label="City-Name" variant="outlined" required onChange={handleChangeCity} value={city} />
       <br/> <br/>
       <TextField id="state" label="State-Name" variant="outlined" required onChange={handleChangeState} value={state} />
       <br/> <br/>
       <TextField id="counrty" label="Country-Name" variant="outlined" required onChange={handleChangeCountry} value={country} />
       <br/> <br/>
      <Button variant="contained" type="submit" size="large" >
        Search
      </Button>
      </form>
      {err && <p style={{color: "red"}}>No such Place Exists!</p>}
    </div>
  );
}
