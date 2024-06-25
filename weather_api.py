import requests

API_KEY = 'e8eccc38488cf5ed988e5d32b0fab339'
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

def get_weather(city):
    params = {
        'q': city,
        'appid': API_KEY,
        'units': 'metric'
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()
    if data['cod'] != 200:
        return f"Error: {data['message']}"
    weather = data['weather'][0]['description']
    temperature = data['main']['temp']
    return f"The weather in {city} is {weather} with a temperature of {temperature}°C"
