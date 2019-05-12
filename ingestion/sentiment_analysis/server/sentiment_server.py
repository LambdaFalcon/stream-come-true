import sys
import pickle 
import json
import re

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
    sys.argv = ["","ml_model/200000-sentiment_classifier.h5", "ml_model/200000-tokenizer.pickle" ]
    if len(sys.argv)!= 3:
        print("usage: <path-to-classifier.h5> <path-to-tokenizer.pickle>")
        exit(0)
    model_file = sys.argv[1]
    tokenizer_file = sys.argv[2]
    #loading model
    model = load_model(model_file)
    model._make_predict_function()

    #load tokenizer
    with open(tokenizer_file, 'rb') as f:
        tokenizer = pickle.load(f)
    
    #serve using waitress
    serve(app, host='localhost', port=5050)