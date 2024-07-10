from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import requests

app = Flask(__name__)
CORS(app, resources={r"/chatbot": {"origins": "http://127.0.0.1:5500"}})


nlp = spacy.load("en_core_web_sm")

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
    if response.status_code == 200:
        data = response.json()
        temp = data['main']['temp']
        description = data['weather'][0]['description']
        return f"The weather in {city} is {description} with a temperature of {temp}°C."
    else:
        return f"Sorry, I couldn't fetch the weather for {city}."

def parse_user_input(user_input):
    doc = nlp(user_input)
    for ent in doc.ents:
        if ent.label_ == "GPE":
            return ent.text
    return None

@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    user_input = request.json['message']
    city = parse_user_input(user_input)
    if city:
        response = get_weather(city)
    else:
        response = "Sorry, I couldn't identify a city in your message. Please try again with a city name."
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
