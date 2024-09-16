import { useState, useRef } from 'react';
import './App.css';
import axios from "axios";
import WeatherInformations from "./components/Weatherinformations/Weatherinformations.jsx";

function App() {
  const [weather, setWeather] = useState({});
  const [weather5days, setWeather5Days] = useState({});
  const inputRef = useRef();
  


  async function searchCity() {
    console.log(inputRef.current.value); // Verificar valor do input
    const city = inputRef.current.value;
    const key = "19c5367bf48a08f6c3a21eea03b43038";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;

    
    try {
      const apiInfo = await axios.get(url);
      const api5Days = await axios.get(url5Days); // Corrigido para usar url5Days
      setWeather(apiInfo.data);
      console.log(apiInfo.data);
      console.log(api5Days.data); 
    } catch (error) {
      console.error('Erro ao buscar dados da cidade:', error);
    }
  }

  return (
    <div className='container'>
    <header>
  <p className='header'>Paulo Henrique - Desenvolvedor Front-End React</p>
</header>
      <h1>Projeto Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder="Digite o nome da Cidade" />
      <button onClick={searchCity}>Buscar</button>
      {/* Corrigido para garantir que weather é um objeto válido */}
      {weather && weather.weather && weather.weather.length > 0 && (
        <WeatherInformations weather={weather} />
      )}
      
    </div>
  );
}

export default App;
