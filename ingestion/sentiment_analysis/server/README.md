### How to Run Sentiment Server
>```python sentiment_server.py path-to-classifier.h5 path-to-tokenizer.pickle```

### API
Ther is only one route

### `/sentiment?text=your%20text`
/sentiment takes the text given by url parameter **text**\
Returne Data: `JSON` object with the following shape where sentiment is the probability of **text** being positive.
```json
{
    "sentiment" : "0.99"
}
``` 