import sys
import pickle 
import json
import re
import os

from flask import Flask
from flask import request
from waitress import serve

from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)

model = None
tokenizer = None

def clean_text(text):
    '''removes non alphanumeric characters and turns the text to lowercase'''
    return re.sub('[^a-zA-z0-9\s]','',text).lower()

@app.route("/sentiment")
def analyze_sentiment_ml():
    '''
    takes the querystring 'text' and returns a number between 0 and 1 
    corresponding to the probability of 'text' being positive
    '''
    #clean input
    text = clean_text(request.args.get('text'))
    #extract features
    features = tokenizer.texts_to_sequences([text])
    #only the first model.input_shape[1] (~32) words will be used for sentiment analysis
    features = pad_sequences(features, maxlen= model.input_shape[1],truncating="post")
    #model.predict returns [[probability negative, probability positive ]]
    positive_probability = model.predict(features)[0][1]
    return json.dumps({"sentiment": float(positive_probability)})

if __name__ == "__main__":
    if len(sys.argv)!= 3:
        print("usage: <path-to-classifier.h5> <path-to-tokenizer.pickle>")
        exit(0)
    model_file = sys.argv[1]
    tokenizer_file = sys.argv[2]
    #loading model
    model = load_model(model_file)
    #otherwise model.predict doesn't work
    model._make_predict_function()

    #loading tokenizer
    with open(tokenizer_file, 'rb') as f:
        tokenizer = pickle.load(f)

    #server setup
    port = 5050
    host = 'localhost'
    if "SENTIMENT_PORT" in os.environ:
        port = int(os.environ["SENTIMENT_PORT"])
    if "SENTIMENT_HOST" in os.environ:
        host = os.environ["SENTIMENT_HOST"]

    #serve using waitress
    serve(app, host="0.0.0.0", port=port)