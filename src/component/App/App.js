import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import aier from './aier-logo.png'
import temp from './temp.png'
import visible from './visible.png'

import weather from './weather-img.png'

import './App.css';


function App() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("Pune");
  const [weatherDescription, setWeatherDescription] = useState("")
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");

  async function loadWeatherData() {

    let response = "";
    try {
      response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c20b7414d083408cadcb2f16f510ca4`)
    }
    catch (error) {
      console.log(error)
    }
    setWeatherData(response.data);
  }


  useEffect(() => {
    loadWeatherData()
  }, [])

  useEffect(() => {
    loadWeatherData();
  }, [city])

  useEffect(() => {
    setWeatherDescription(`${weatherData?.weather?.[0]?.description} (${weatherData?.weather?.[0]?.main})`)
    setHumidity(`${weatherData?.main?.humidity}`)
    setWind(`${weatherData?.wind?.speed}`)

  }, [weatherData])


  return (
    <div className='container'>
      <input type='text'
        // value={city}
        id='input'
        placeholder='Search'
        className='search'
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
       {/* <button type='button' 
      className='search-btn'
       > 🔍</button>  */}

      <div className='row'>
        <div className='col'>
          <p className='city-name ml-5'> {city}</p>
          <p className='discription ml-5'> {weatherDescription}</p>
          <div className=' ml-5 mt'>
            <Card Img={temp} report={humidity} unit={'°F'} />
            <Card Img={visible} report={weatherData?.visibility} unit={'Meters'} />
            <Card Img={aier} report={wind} unit={'km/h'} />

          </div>
        </div>

        <div className='col'>
          <img src={weather} alt='weather' className='weather-img' />
          <p className='temp'> {(weatherData?.main?.temp - 273).toFixed(1)}°c</p>
        </div>
      </div>
    </div>
  );
}

export default App;
