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

### Note: Sentiment Server on VM
As it was not able to install tensorflow on the vm I had to move to docker.

Also note that the dockerfile requires all files that are named to be present when building the image.

On the vm the container is called sentiment_server and can be started as a daemon with 
>```docker run -d -p 5050:5050 sentiment_server```
