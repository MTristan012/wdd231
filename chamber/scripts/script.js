document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.getElementById('nav-menu')?.classList.toggle('open');
});

document.getElementById('year') &&
    (document.getElementById('year').textContent = new Date().getFullYear());

document.getElementById("last-modified").textContent = document.lastModified;

async function getWeather() {
    try {
        const response = await fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=Puebla,mx&units=metric&lang=en&appid=aa3396459513d0e7b566157a2ee45cb9'
        );
        const data = await response.json();

        const weather = document.getElementById('weather');
        const formatTime = (timestamp) => {
            const date = new Date(timestamp * 1000);
            return date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
        };

        weather.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <p>${data.weather[0].description}</p>
      <p>🌡️ Temp: ${data.main.temp}°C</p>
      <p>🔺 Max: ${data.main.temp_max}°C</p>
      <p>🔻 Min: ${data.main.temp_min}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌅 Sunrise: ${formatTime(data.sys.sunrise)}</p>
      <p>🌇 Sunset: ${formatTime(data.sys.sunset)}</p>
    `;
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById('weather').innerHTML = "<p>No se pudo cargar el clima.</p>";
    }
}

getWeather();

async function getForecast() {
    try {
        const response = await fetch(
            'https://api.openweathermap.org/data/2.5/forecast?q=Puebla,mx&units=metric&lang=en&appid=aa3396459513d0e7b566157a2ee45cb9'
        );
        const data = await response.json();

        const forecastData = document.querySelector('.forecast-data');
        const dailyForecast = {};

        data.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!dailyForecast[date]) {
                dailyForecast[date] = [];
            }
            dailyForecast[date].push(item);
        });

        const forecastDays = Object.keys(dailyForecast).slice(1, 4);

        let forecastHTML = '';

        forecastDays.forEach(date => {
            const dayData = dailyForecast[date];
            const temps = dayData.map(entry => entry.main.temp);
            const minTemp = Math.min(...temps).toFixed(1);
            const maxTemp = Math.max(...temps).toFixed(1);

            const noonData = dayData.find(entry => entry.dt_txt.includes("12:00:00")) || dayData[0];
            const icon = noonData.weather[0].icon;
            const description = noonData.weather[0].description;

            const dayName = new Date(date).toLocaleDateString('es-MX', { weekday: 'long' });

            forecastHTML += `
        <div class="forecast-day">
          <p><strong>${dayName}</strong></p>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
          <p>${description}</p>
          <p>🔺 ${maxTemp}°C / 🔻 ${minTemp}°C</p>
        </div>
      `;
        });

        forecastData.innerHTML = forecastHTML;

    } catch (error) {
        console.error("Error fetching forecast:", error);
        document.querySelector('.forecast-data').innerHTML = "<p>No se pudo cargar el pronóstico.</p>";
    }
}

getForecast();