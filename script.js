document.addEventListener('DOMContentLoaded', () => {
    const weatherContainer = document.getElementById('weather');
    const fetchWeatherButton = document.getElementById('fetchWeatherBtn');
    const cityInput = document.getElementById('cityInput');

    /**
     * Fetch and display weather data from the OpenWeatherMap API.
     * @param {string} city - The city name to fetch weather data for.
     */
    function fetchWeatherData(city) {
        const apiKey = 'YOUR_API_KEY';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                weatherContainer.innerHTML = '<p class="text-danger">Failed to load weather data.</p>';
            });
    }

    /**
     * Display the fetched weather data on the webpage.
     * @param {Object} weatherData - The weather data object.
     */
    function displayWeather(weatherData) {
        weatherContainer.innerHTML = createWeatherCard(weatherData);
    }

    /**
     * Create HTML for a weather card.
     * @param {Object} weatherData - The weather data object.
     * @returns {string} - HTML string for the weather card.
     */
    function createWeatherCard(weatherData) {
        const temperature = (weatherData.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
        return `
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Weather in ${weatherData.name}</h2>
                    </div>
                    <img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" class="card-img-top" alt="Weather icon">
                    <div class="card-body">
                        <p class="card-text">Temperature: ${temperature}°C</p>
                        <p class="card-text">Weather: ${weatherData.weather[0].description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Event listener for the fetch weather button
    fetchWeatherButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        } else {
            weatherContainer.innerHTML = '<p class="text-danger">Please enter a city name.</p>';
        }
    });
});
