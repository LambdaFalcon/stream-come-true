import re
import pickle
import pandas as pd
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers import Dense, Embedding, LSTM, SpatialDropout1D
from sklearn.model_selection import train_test_split
from keras.utils.np_utils import to_categorical

#in the Sentiment140 dataset 0 = Negative and 4 = Positive
NEGATIVE_SENTIMENT = 0
POSITIVE_SENTIMENT = 4

def read_data(file):
    '''
    reads Sentiment140 dataset and returns dataframe with ["text", "sentiment"]
    where sentiment = "Positive" | "Negative"
    '''
    df = pd.read_csv(file, 
        names=["sentiment", "id", "date", "probably_source", "user", "text"],
        index_col=False, 
        encoding = "ISO-8859-1")
   
    # we only keep the text and sentiment
    df = df[['text','sentiment']]

    #set text to lowercase
    df['text'] = df['text'].apply(lambda x: x.lower())

    #remove all non alphanumeric characters
    df['text'] = df['text'].apply((lambda x: re.sub('[^a-zA-z0-9\s]','',x)))
    print(df.dtypes)
    return df

def get_training_data(data, size):
    '''returns dataframe with TRAINING_SIZE/2 positive and TRAINING_SIZE/2 negative entries taken at random'''
    negative = data[data["sentiment"] == NEGATIVE_SENTIMENT].sample(size//2)
    positive = data[data["sentiment"] == POSITIVE_SENTIMENT].sample(size//2)
    return pd.concat([positive,negative])

def train_classifier(data):
    '''returns classifier and tokenizer for storeing later'''

    max_features = 2000
    embed_dim = 128
    lstm_out = 196
    #only considers the max_features most frequent words 
    tokenizer = Tokenizer(num_words=max_features, split=' ')
    tokenizer.fit_on_texts(data['text'].values)
    X = tokenizer.texts_to_sequences(data['text'].values)
    X = pad_sequences(X)
    
    model = Sequential()
    model.add(Embedding(max_features, embed_dim,input_length = X.shape[1]))
    model.add(SpatialDropout1D(0.4))
    model.add(LSTM(lstm_out, dropout=0.2, recurrent_dropout=0.2))
    model.add(Dense(2,activation='softmax'))
    model.compile(loss = 'categorical_crossentropy', optimizer='adam',metrics = ['accuracy'])

    Y = pd.get_dummies(data['sentiment']).values
    X_train, X_test, Y_train, Y_test = train_test_split(X,Y, test_size = 0.33, random_state = 42)

    model.fit(X_train, Y_train, epochs = 8, batch_size=32, verbose = 2)

    validation_size = 1500
    
    X_validate = X_test[-validation_size:]
    Y_validate = Y_test[-validation_size:]
    X_test = X_test[:-validation_size]
    Y_test = Y_test[:-validation_size]
    score,acc = model.evaluate(X_test, Y_test, verbose = 2, batch_size = 32)
    
    print("score: %.2f" % (score))
    print("acc: %.2f" % (acc))

    return tokenizer, model




if __name__ == "__main__":
    file = "data/training.1600000.processed.noemoticon.csv"
    #Training size should be divisble by two, since we are taking half positive and half negative samples
    TRAINING_SIZE = 20000
    data = read_data(file)
    data = get_training_data(data, TRAINING_SIZE)
    tokenizer, model = train_classifier(data)

    #storeing model and tokenizer to be used by the server
    model.save('out/sentiment_classifier.h5')
    with open('out/tokenizer.pickle', 'wb') as f:
        pickle.dump(tokenizer, f, protocol=pickle.HIGHEST_PROTOCOL)


