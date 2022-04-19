
function getUserGeolocation() {

    const success = (position)=> {
        console.log(position)
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        getWeatherData(lat,lon)
    }

    const failed = () => {
        console.log("Cannot get location")
    }

    navigator.geolocation.getCurrentPosition(success,failed);

}


async function getWeatherData(lat,lon) {

    const key = "433463a9b913a2a3495771fdd4dd2698";
    const request = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=${key}`);
    const response = await request.json();
    const request2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=${key}`)
    const response2 = await request2.json();
    console.log(response2);
    cityName = document.getElementById("cityEl").innerHTML = `${response2.name}, ${response2.sys.country}`
    currentweatherImage = document.getElementById("weatherImg").setAttribute("src",`https://openweathermap.org/img/wn/${response2.weather[0].icon}@2x.png`)
    currentTemp = document.getElementById("currentTemp").innerHTML = `${Math.round(response.current.temp)} °F`
    citySunrise = document.getElementById("citySunrise").innerHTML = `Sunrise: ${moment.unix(response.current.sunrise).format("LT")}`
    citySunset = document.getElementById("citySunset").innerHTML = `Sunset: ${moment.unix(response.current.sunset).format("LT")}`
    cityHumid = document.getElementById("cityHumid").innerHTML = `Humidity: ${response.current.humidity}%`
    cityFeelLike = document.getElementById("feelsLike").innerHTML = `Feels like: ${Math.round(response.current.feels_like)} °F`
    weatherDescription = document.getElementById("weatherDes").innerHTML = `${response.current.weather[0].main}, ${response.current.weather[0].description}`
    cityHighLow = document.getElementById("highandLow").innerHTML = `High will be ${Math.round(response.daily[0].temp.max)} °F and low will be ${Math.round(response.daily[0].temp.min)} °F`
    date = document.getElementById("date").innerHTML = moment.unix(response.current.dt).format("MM/DD/YYYY")

    function forecast() {
        
        let dailyforecast = response.daily;
        for (let x = 1; x < dailyforecast.length; x++) {
            let daily = dailyforecast[x];
            let maxTemp = Math.round(daily.temp.max);
            let minTemp = Math.round(daily.temp.min);
            let weatherDes = daily.weather[0].description;
            let weatherIcon = daily.weather[0].icon;
            let weatherDt = moment.unix(daily.dt).format("MM/DD/YYYY");
            displayWeather(weatherDt,weatherIcon,maxTemp,minTemp,weatherDes )

        }
    }

    function displayWeather(weatherDt,weatherIcon,maxTemp,minTemp,weatherDes) {
        let display = `<li class="day1">
        <p class="day1day">${weatherDt}</p>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="" class="day1icon">
        <p class="day1temp">${maxTemp}°F / ${minTemp}°F</p>
        <p class="day1des">${weatherDes}</p>
    </li>`
    document.querySelector("#forecast").innerHTML += display;

    }

    forecast()
}








getUserGeolocation()

