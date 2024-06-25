import spacy
from weather_api import get_weather

nlp = spacy.load('en_core_web_sm')

def parse_user_input(user_input):
    doc = nlp(user_input)
    for ent in doc.ents:
        if ent.label_ == 'GPE':  # GPE (Geo-Political Entity) label for city names
            return ent.text
    return None

def chatbot_response(user_input):
    city = parse_user_input(user_input)
    if city:
        return get_weather(city)
    return "Sorry please try again."

if __name__ == "__main__":
    print("Hello! I am a weather chatbot. What information do you need?")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit']:
            print("Chatbot: Goodbye!")
            break
        response = chatbot_response(user_input)
        print(f"Chatbot: {response}")
