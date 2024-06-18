import { WEATHER } from './weather.js';

const queryString = window.location.search;
const btnClear = document.querySelector('#storageClear');
const urlParams = new URLSearchParams(queryString);
const villeInsee = urlParams.get('villeInsee');
const villeDisplay = document.getElementById('villeDisplay');
const cityNameElement = document.getElementById('cityName');
const cityCpElement = document.getElementById('cityCp');
const cityLocationElement = document.getElementById('cityLocation');
const cityTempElement = document.getElementById('cityTemp');
const cityWeatherElement = document.getElementById('cityWeather');
const forecastDisplayElements = document.querySelectorAll('.forecastDisplay');
const forcastHourElement = document.querySelectorAll('.forecastHour');
const windDisplayElements = document.querySelectorAll('.windDisplay');
const windHourElement = document.querySelectorAll('.windHour');
const dayDurationElement = document.getElementById('dayDuration');
const daySetElement = document.getElementById('daySet');
const dayMoonElement = document.getElementById('dayMoon');
const weekDisplayElements = document.querySelectorAll('.weekDisplay');
const dateInput = document.getElementById('dateImportante');
const importanteDiv = document.getElementById('importanteDiv');

// Charger les dates depuis le local storage au chargement de la page
const storedDates = JSON.parse(localStorage.getItem('datesImportantes')) || [];
storedDates.forEach(date => {
    const newDiv = document.createElement('div');
    newDiv.textContent = date;
    newDiv.classList.add('dateDisplay');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.classList.add('deleteButton');

    deleteButton.addEventListener('click', function() {
        let dates = JSON.parse(localStorage.getItem('datesImportantes')) || [];
        dates = dates.filter(d => d !== date);
        localStorage.setItem('datesImportantes', JSON.stringify(dates));
        importanteDiv.removeChild(newDiv);
    });

    newDiv.appendChild(deleteButton);
    importanteDiv.appendChild(newDiv);
});

const deleteButtons = document.querySelectorAll('.deleteButton');

localStorage.setItem('selectedVilleInsee', villeInsee);
console.log(localStorage.selectedVilleInsee);

btnClear.addEventListener('click',function(){
    localStorage.clear();
    alert('Les données ont été effacées.');
    window.location.href = "./index.html";
});

const request1 = fetch("https://api.meteo-concept.com/api/forecast/nextHours?token=1aebfdf3069836a71bd533a70c5e08e8c3a72434d5857e61bb9400233d3e718e&insee=" + localStorage.selectedVilleInsee).then(response => response.json());
const request2 = fetch("https://api.meteo-concept.com/api/ephemeride/0?token=1aebfdf3069836a71bd533a70c5e08e8c3a72434d5857e61bb9400233d3e718e&insee=" + localStorage.selectedVilleInsee).then(response => response.json());
const request3 = fetch("https://api.meteo-concept.com/api/forecast/daily/?token=1aebfdf3069836a71bd533a70c5e08e8c3a72434d5857e61bb9400233d3e718e&insee=" + localStorage.selectedVilleInsee).then(response => response.json());

fetch("https://api.meteo-concept.com/api/forecast/nextHours?token=1aebfdf3069836a71bd533a70c5e08e8c3a72434d5857e61bb9400233d3e718e&insee=" + localStorage.selectedVilleInsee)
Promise.all([request1, request2, request3])
    .then(([data1, data2, data3]) => {
        console.log(data1, data2, data3);
        
        // Affectation des données JSON aux éléments HTML
        cityNameElement.textContent = data1.city.name;
        cityCpElement.textContent = data1.city.cp;
        cityLocationElement.textContent = `Latitude : ${data1.city.latitude}, Longitude : ${data1.city.longitude}`;
        cityTempElement.textContent = `${data3.forecast[0].tmax}° / ${data3.forecast[0].tmin}°`;
        cityWeatherElement.textContent = `Conditions météorologiques : ${WEATHER[data1.forecast[0].weather]}`;

        // Mise à jour des prévisions
        data1.forecast.forEach((forecast, index) => {
            if (forecastDisplayElements[index]) {
                const tempElement = forecastDisplayElements[index].querySelector('.forecastDisplay_temp');
                const weatherElement = forecastDisplayElements[index].querySelector('.forecastDisplay_weather');
                const probaElement = forecastDisplayElements[index].querySelector('.forecastDisplay_proba');
                const dirElement = windDisplayElements[index].querySelector('.windDisplay_dir');
                const speedElement = windDisplayElements[index].querySelector('.windDisplay_speed');

                forcastHourElement[index].textContent = forecast.datetime.substring(11, 13) + 'h';
                tempElement.textContent = forecast.temp2m + 'C°';
                weatherElement.textContent = WEATHER[forecast.weather];
                probaElement.textContent = `Probabilité de pluie : ${forecast.probarain}%`;
                windHourElement[index].textContent = forecast.datetime.substring(11, 13) + 'h';
                dirElement.textContent = forecast.dirwind10m + '°';
                speedElement.textContent = forecast.wind10m + 'km/h';
            }
        })

        dayDurationElement.textContent = data2.ephemeride.duration_day;
        daySetElement.textContent = data2.ephemeride.sunrise + "  " + data2.ephemeride.sunset;
        dayMoonElement.textContent = data2.ephemeride.moon_phase

        for (let index = 0; index < 10; index++) {
            if (weekDisplayElements[index]) {
                const tempElement = weekDisplayElements[index].querySelector('.weekDisplay_temp');
                const weatherElement = weekDisplayElements[index].querySelector('.weekDisplay_weather');
                const dateElement = weekDisplayElements[index].querySelector('.weekDisplay_date');

                tempElement.textContent = data3.forecast[index].tmax + "°/" + data3.forecast[index].tmin + "°";
                weatherElement.textContent = WEATHER[data3.forecast[index].weather];
                dateElement.textContent = data3.forecast[index].datetime.substring(8, 10) + " / " + data3.forecast[index].datetime.substring(5, 7);
                
            }
        }

        // Ajouter un événement pour détecter les changements de date
        dateInput.addEventListener('change', () => {
            const date = dateInput.value;
            if (date) {
                const newDiv = document.createElement('div');
                newDiv.textContent = date;
                newDiv.classList.add('dateDisplay');
                importanteDiv.appendChild(newDiv);
                let dates = JSON.parse(localStorage.getItem('datesImportantes')) || [];
                if (!dates.includes(date)) {
                    dates.push(date);
                    localStorage.setItem('datesImportantes', JSON.stringify(dates));
                }
            }
        });
    })
    .catch(error => alert("Erreur : " + error));


