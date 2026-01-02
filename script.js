const iconMap = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",

  45: "🌫️",
  48: "🌫️",

  51: "🌦️",
  53: "🌦️",
  55: "🌧️",

  61: "🌧️",
  63: "🌧️",
  65: "🌧️",

  71: "🌨️",
  73: "🌨️",
  75: "❄️",

  80: "🌦️",
  81: "🌧️",
  82: "⛈️",

  95: "⛈️",
};
const textMap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",

  45: "Foggy",
  48: "Foggy",

  51: "Drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",

  61: "Rain",
  63: "Rain",
  65: "Heavy rain",

  71: "Snow",
  73: "Snow",
  75: "Heavy Snow",

  80: "Rain showers",
  81: "Rain showers",
 82:"Vioent",

  95: "Thunderstorm",
};
const getIcon=c=>iconMap[c] || "☁️";
const getText=c=>textMap[c] || "Unknown";
async function getCoords(city){
 const r=await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
);
const d=await r.json();
if(!d.results || d.results.length===0){
    throw new Error("City not found");
}
return d.results[0];
}
async function getWeather(lat,lon){
    return fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,pressure_ms1,weather_codel&timezone=auto`
    ).then(r=>r.json())
};
function updateCurrent(loc,w){
    const c=w.current;
    document.getElementById("locationName").textContent=`${loc.name}, ${loc.country}`;
    date.textContent=new Date().toDateString();
    currentIcon.textContent=getIcon(c.weather_code);
    temperature.textContent=Math.round(c.temperature_2m)+"°C";
    description.textContent=getText(c.weather_code);
    feelsLike.textContent=Math.round(c.apparent_temperature)+"°C";
    humidity.textContent=c.relative_humidity_2m+"%";
    windSpeed.textContent=Math.round(c.wind_speed_10m)+" km/h";
    pressure.textContent=Math.round(c.pressure_ms1)+" hPa";
}
function updateHourly(w){
    hourlyForecast.innerHTML="";
    for(let i=0;i<24;i++){
        hourlyForecast.innerHTML+=`
        <div class="hourly-item>
        ${new Date(w.hourly.time[i]).getHours()}:00<br>
        ${getIcon(w.hourly.weather_code[i])}<br>
        ${Math.round(w.hourly.temperature_2m[i])}
        </div>
        `;
    }
}