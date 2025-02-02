import { useState, useEffect } from "react";
import "./App.css";

// Import images
import loupe from "./assets/loupe.png";
import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import wind_1 from "./assets/wind_1.png";
import humidity_1 from "./assets/humidity_1.png";
import drezzle from "./assets/drezzle.png";

import PropTypes from "prop-types";

// WeatherDetails component
function WeatherDetails({
  icon,
  temp,
  city,
  country,
  lat,
  long,
  humidity,
  wind,
}) {
  return (
    <>
      <div className="weather-condition">
        <img src={icon} alt="image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="card">
        <div>
          <span className="lat">Lattitude </span>
          <span>{lat}</span>
        </div>

        <div>
          <span className="log">Longtitude </span>
          <span>{long}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_1} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidty-parcent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_1} alt="humidity" className="icon" />
          <div className="data">
            <div className="wind-parcent">{wind} Km / h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
}

// App component
function App() {
  let api_key = "d62ce3a1bf1ab725a64320d2f2d1d110";
  const [img, setImg] = useState(drezzle);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Colombo");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [text, setText] = useState("Colombo");
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);

  useEffect(() => {
    search();
    return () => {};
  }, []);

  const weatherIconMap = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": cloud,
    "04n": cloud,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": rain,
    "11n": rain,
    "13d": snow,
    "13n": snow,
    "50d": wind,
    "50n": wind,
  };

  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      if (data.code === "404") {
        console.log("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIcon = data.weather[0].icon;
      setImg(weatherIconMap[weatherIcon] || drezzle);
      setCityNotFound(false);
      console.log(data);
    } catch (error) {
      console.log("The error is :", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Rest of the code...

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // setCity(text);
      search();
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div className="search-icon">
            <img src={loupe} alt="search-icon" onClick={() => search()} />
          </div>
        </div>
        <WeatherDetails
          icon={img}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          long={log}
          humidity={humidity}
          wind={wind}
        />

        <p className="copywrite">
          Designed by <span>Afrih ARM</span>
        </p>
      </div>
    </>
  );
}

export default App;

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
};
