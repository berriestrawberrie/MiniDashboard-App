// Load API key from environment variable

import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY as string;

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&appid=${API_KEY}`;
