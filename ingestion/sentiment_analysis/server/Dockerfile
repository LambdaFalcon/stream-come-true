FROM python:3
ADD sentiment_server.py /
ADD ml_model /ml_model
ADD requirements.txt /
RUN pip install -r /requirements.txt
CMD [ "python", "/sentiment_server.py", "/ml_model/sentiment_classifier.h5","/ml_model/tokenizer.pickle" ]