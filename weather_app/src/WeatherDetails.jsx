import PropTypes from "prop-types";


function WeatherDetails(props) {
  return (
    <>
    <div className="image">
      <img src={props.icon} alt="image" />
    </div>
    console.log(Hi)
  </>
  )
}

export default WeatherDetails

WeatherDetails.propTypes = {
    icon: PropTypes.string.isRequired,
  };