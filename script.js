const API_Key = "010d0503fa004108ad6133121232901";

const locationId = document.getElementById("loaction");
const Currenttemp = document.getElementById("current-temp-card");
const timeZoneId = document.getElementById("timezone-card");
const home2Id = document.getElementById("home2");
const home3Id = document.getElementById("home3");


const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector(".header");

const toggleNavbar = () => {

  nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());



getWeatherData();


function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);
    let { latitude, longitude } = success.coords;

    console.log(latitude, longitude);

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q=${latitude},${longitude}&days=7&aqi=yes&alerts=yes`
    )
      .then((req) => req.json())
      .then((data) => {
      
        showData(data);
      });

	
  });
}

const loadId = document.getElementById("loader")

function loadFunction(){
  loadId.style.display = "none"
}

function getCity(){
    const cityID = document.getElementById("search-bar").value

    searchWeatherData(cityID)
    

}

function searchWeatherData(city){

    fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q=${city}&days=7&aqi=yes&alerts=yes`
      )
        .then((req) => req.json())
        .then((data) => {
         
          showData(data);
        });

      
    
}







function showData(data) {
  let { tz_id, country, name, region } = data.location;

  let { temp_c, feelslike_c, humidity, pressure_mb, vis_km, wind_kph, uv } =
    data.current;
  let { maxtemp_c, mintemp_c } = data.forecast.forecastday[0].day;
  let { moon_phase } = data.forecast.forecastday[0].astro;

  let { text, icon } = data.current.condition;
  let { dewpoint_c } = data.forecast.forecastday[0].hour[0];
  let tm = data.location.localtime;
  const dtm = tm.split(" ");

  timeZoneId.innerHTML = `<div class="head">
  <h3>Time Zone</h3>

</div>

<div class="data">
  <div>${tz_id}</div>
  <div>${dtm[1]}</div>
  <div>${dtm[0]}</div>

</div>`





 Currenttemp.innerHTML=`
 
 <div class="head">
                <h3>${name}, ${region} , ${country}</h3>
            </div>

            <div class="image">
                

            
            <div class="data">
                <h2 >${temp_c}&#176C</h2>
                <div >${text}</div>
                <div> Max-temp ${maxtemp_c}&#176C</div>
                <div > Min-temp ${mintemp_c}&#176C</div>
            </div>

            <div>
                <img src="https:${icon}">
            </div>

            </div>
 
 
 `



 home2Id.innerHTML = `

 <div class="today">
 <div class="head">
     <h3>
         Weather today in ${name}, ${region}, ${country}
     </h3>

     <div >
         <span class="feels-temp">${feelslike_c}&#176C</span>
         <span class="feels-like" >&nbsp Feels like</span>
     </div>

 </div>

 <div class="other-info">
     <div class="row">
         <div><img src="assets/thermometer.png"> High/Low</div>
         <div>${maxtemp_c}°/${mintemp_c}°</div>
 
         </div>
 
         <div class="row">       
         <div><img src="assets/humidity.png"> Humidity</div>
         <div>${humidity}%</div>
 
         </div>
 
         <div class="row">
         <div><img src="assets/pressure.png" > Pressure</div>
         <div>${pressure_mb}mb</div>
 
         </div>
 
         <div class="row">
         <div><img src="assets/view.png" > Visibility</div>
         <div>${vis_km}Km</div>
 
         </div>
 
         <div class="row">
         <div><img src="assets/wind.png"> Wind</div>
         <div>${wind_kph} km/h</div>
 
         </div>
 
         <div class="row">
         <div><img src="assets/dew-point.png"> Dew Point</div>
         <div>${dewpoint_c}°</div>
 
         </div>
 
         <div class="row">
         <div> <img src="assets/uv-protective-fabric.png"> UV Index</div>
         <div>${uv} of 10</div>
 
         </div>
 
         <div class="row">
         <div> <img src="assets/moon.png"> Moon Phase</div>
         <div>${moon_phase}</div>
 
         </div>
 </div>
</div>
 
 
 `






 let mor_temp_c = data.forecast.forecastday[0].hour[6].temp_c;
  let mor_text = data.forecast.forecastday[0].hour[6].condition.text;
  let mor_icon = data.forecast.forecastday[0].hour[6].condition.icon;

  let af_temp_c = data.forecast.forecastday[0].hour[12].temp_c;
  let af_text = data.forecast.forecastday[0].hour[12].condition.text;
  let af_icon = data.forecast.forecastday[0].hour[12].condition.icon;

  let eve_temp_c = data.forecast.forecastday[0].hour[18].temp_c;
  let eve_text = data.forecast.forecastday[0].hour[18].condition.text;
  let eve_icon = data.forecast.forecastday[0].hour[18].condition.icon;

  let ni_temp_c = data.forecast.forecastday[0].hour[23].temp_c;
  let ni_text = data.forecast.forecastday[0].hour[23].condition.text;
  let ni_icon = data.forecast.forecastday[0].hour[23].condition.icon;



  home3Id.innerHTML = `
  
  <div class="head">
            <h3>Todays forecast for ${name} ${region}, ${country} </h3>
        </div>

        <div class="data">
            <div class="row">

                <h4>Morning</h4>
                <div>${mor_temp_c}°</div>  
                <img src="https:${mor_icon}" >
                <div>${mor_text}</div>
                
            </div>
        
            <div class="row">
                <h4>After</h4>
                <div>${af_temp_c}°</div>  
                <img src="https:${af_icon}">
                <div>${af_text}</div>
        
        
        
            </div>
        
            <div class="row">
                <h4>Evening</h4>
                <div>${eve_temp_c}°</div>  
                <img src="https:${eve_icon}">
                <div>${eve_text}</div>
        
        
        
            </div>
        
            <div class="row">
        
                <h4>Overnight</h4>
                <div>${ni_temp_c}°</div>  
                <img src="https:${ni_icon}">
                <div>${ni_text}</div>
        </div>
    
  
  `


}
