import "./main.scss";
import {getCity} from './app/forecast';
import {getWeather} from './app/forecast';

const form      = document.querySelector('.form');
const location  = document.querySelector('#location');
const info      = document.querySelector('.info');
const day_night = document.querySelector('.day_night');
const weather_icon = document.querySelector('.weather_icon');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var loc = location.value.trim();
  form.reset();
  updateCity(loc)
    .then (data => updateUI(data))
    .catch(err  => console.log(err))
});


const updateCity = async (city) => {
  const cityInfo    = await getCity(city);
  const cityWeather = await getWeather(cityInfo.Key);

  return { cityInfo, cityWeather };
}

const updateUI = (data) => {
  const { cityInfo, cityWeather} = data; // destructuring

  console.log(cityInfo);
  console.log(cityWeather.WeatherIcon);

  let weatherIconSrc = `./assets/icons/${cityWeather.WeatherIcon}.svg`;

  info.innerHTML = `
    <div>
      <h3 class="city_name">${cityInfo.EnglishName.toUpperCase()}</h3>
      <div class="weather_condition">${cityWeather.WeatherText.toUpperCase()}</div>
      <h4 class="temp">
        ${cityWeather.Temperature.Metric.Value}
        <span>&deg;</span>
        ${cityWeather.Temperature.Metric.Unit}
      </h4>
    </div>
    <img class="weather_icon" src="${weatherIconSrc}" alt="">
  `

  let timeSrc = null;

  if(cityWeather.IsDayTime) { timeSrc = './assets/day.svg' }
  if(!cityWeather.IsDayTime) { timeSrc = './assets/night.svg' }
  day_night.setAttribute('src', timeSrc);

  weather_icon.setAttribute('src', weatherIconSrc);
}

// Default display
updateCity('manila')
  .then (data => updateUI(data))
  .catch(err  => console.log(err))