import React, { useState } from 'react';

const WeatherApp = () => {
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!country) {
      setError('Please enter a country name');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      setError('Failed to fetch weather data');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Weather Checker</h1>
      
      <div className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          onClick={fetchWeather}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? 'Fetching...' : 'Get Weather'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {weatherData && (
        <div className="mt-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">{weatherData.name}, {weatherData.sys.country}</h2>
          <p className="text-lg mb-2">Temperature: {weatherData.main.temp}°C</p>
          <p className="text-lg mb-2">Visiblity: {weatherData.visibility}</p>
          <p className="text-lg mb-2">Humidity: {weatherData.main.humidity}%</p>
          <img src='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHBuY21teThleGg5eG4wNm1zMGV6YzZzMzVmczFyYW53ZnppODY5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VI2UC13hwWin1MIfmi/giphy.gif' alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
