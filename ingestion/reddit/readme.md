This directory contains everything necessairy to collect reddit comments and inget them via logstash into elastic.

## Running reddit_stream.py locally
### 1.) Installing dependcies
To run **reddit_stream.py** you need **python 3.7** and install the dependency praw
>```pip install praw```

### 2.) Configuration

A file called **secret.json** needs to be in the same folder as reddit_stream.py or in /etc/stream-come-true/ (note that if secret.json exists in both places, the first one will be used).\
secret.json needs to have the following structure (can also be found in secret.json.template).
>``` json
>{
>    "CLIENT_ID" : "<client id>",
>    "CLIENT_SECRET" : "<client secret>"
>}
>```

The same goes for a file called public.json which holds the location of the logstash server and the subreddit names that need to be tracked.\
Example:
>``` json
>{
>    "subreddits":["android","apple"],
>    "logstash":{
>        "port":5040,
>        "host":"localhost"
>    }
>}
>```

### 3.) Run
Now you can just run reddit_stream.py with 
>``` python reddit_stream.py``` 

Note that you will need to run logstash with reddit_ingestion.conf for this to work.

## Notes
Note that reddit_stream is set up as a service on the vm and can be started and stopped with
> ```sudo systemctl start/stop reddit_stream```