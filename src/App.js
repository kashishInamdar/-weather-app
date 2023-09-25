import logo from './logo.svg';
import axios from 'axios';
import { useState , useEffect } from 'react';
import './App.css';


function App() {
  async function loadWeatherData(){
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=6c20b7414d083408cadcb2f16f510ca4`)

    console.log(response);
  }

  const [weatherData ,setWeatherData] = useState({});
  useEffect(() => {
    loadWeatherData()
  } , [])
  return (
   <div>
    <h1>Weather App</h1>
   </div>
  );
}

export default App;
