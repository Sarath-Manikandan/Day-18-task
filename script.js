var rest_api = "https://restcountries.com/v3.1/all";

async function fetchCountries() {
    try {
        var response = await fetch(rest_api);
        var countries = await response.json();
        renderCountries(countries);
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

function renderCountries(countries) {
    var parent = document.querySelector(".row");

    countries.forEach((country) => {
        var dataCont = document.createElement("div");
        dataCont.classList.add("card");

        var lat = country.latlng[0];
        var lng = country.latlng[1];
        dataCont.setAttribute("lat", lat);
        dataCont.setAttribute("lng", lng);

        var countryName = document.createElement("h3");
        countryName.innerText = country.name.common;
        dataCont.append(countryName);

        var countryFlag = document.createElement("img");
        countryFlag.setAttribute("src", country.flags.png);
        dataCont.append(countryFlag);

        var countryCaptial = document.createElement("p");
        countryCaptial.innerText = "Capital: " + country.capital[0];
        dataCont.append(countryCaptial);

        var countryRegion = document.createElement("p");
        countryRegion.innerText = "Region: " + country.region;
        dataCont.append(countryRegion);

        var countryCode = document.createElement("p");
        countryCode.innerText = "Country Code: " + country.cca3;
        dataCont.append(countryCode);

        var clickButton = document.createElement("button");
        clickButton.addEventListener("click", function () {
            getWeather(this);
        });
        clickButton.innerHTML = "Click for Weather";
        dataCont.append(clickButton);

        parent.append(dataCont);
    });
}

async function getWeather(button) {
    var parent = button.parentElement;
    var lat = parent.getAttribute("lat");
    var lon = parent.getAttribute("lng");
    var api_key = "02c0a4cb6d534fb8ec504bd1d2f69fe2";
    var weather_api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

    try {
        var response = await fetch(weather_api);
        var weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

function displayWeather(weatherData) {
    var result = document.querySelector("body div.container");
    result.innerHTML = "";

    var dataEelement = document.createElement("h1");
    dataEelement.classList.add("Name");
    dataEelement.innerText = weatherData.sys.country;
    result.append(dataEelement);

    var dataEelement1 = document.createElement("p");
    dataEelement1.classList.add("Weather");
    dataEelement1.innerText = JSON.stringify(weatherData.weather);
    result.append(dataEelement1);
}

fetchCountries();
