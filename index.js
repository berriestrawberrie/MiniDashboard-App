// Load API key from environment variable
import dotenv from 'dotenv';
dotenv.config();
// ====== FETCH WEATHER DATA ======
const fetchWeather = async (city) => {
    const API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.weather || data.weather.length === 0) {
            throw new Error('Weather data not found');
        }
        // ====== DISPLAY IN CONSOLE ====== 
        console.log('\n********************* WEATHER DATA *********************\n');
        console.log(`Weather in ${city}: ${data.weather[0].description}, temperature: ${data.main.temp}°C`);
        console.log('\n*********************************************************\n');
    }
    catch (error) {
        console.error('Fetch error:', error);
    }
};
fetchWeather('Stockholm,SE');
//# sourceMappingURL=index.js.map