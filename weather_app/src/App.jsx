import "./App.css";
import useState from "react";

//import
import loupe from "./assets/loupe.png";
import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import wind from "./assets/wind.png";
import humidity from "./assets/humidity.png";
import drezzle from "./assets/drezzle.png";
import WeatherDetails from "./WeatherDetails";

// import PropTypes from "prop-types";

// const WeatherDetails = (props) => {
//   return (
//   <>
//     <div className="image">
//       <img src={props.icon} alt="image" />
//     </div>
//   </>
//   );
// };

function App() {
  
  const [img, setImg] = useState(wind);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityInput" placeholder="Search City" />
          <div className="search-icon">
            <img src={loupe} alt="search-icon" />
          </div>
        </div>
        {/* <WeatherDetails icon={img} /> */}

        <WeatherDetails icon={img} />

      </div>
    </>
  );
}

export default App;

// WeatherDetails.propTypes = {
//   icon: PropTypes.string.isRequired,
// };
