import json
import socket
import time
import os
import logging
import praw

#logger setup
logging.basicConfig(format='%(asctime)s - %(levelname)s - %(message)s')
LOGGER = logging.getLogger("reddit stream")
class LogstashClient:
    '''Client that handles connection to logstash (over TCP) and automatically reconnects if there are any issues'''
    def __init__(self, host, port, max_reconnections=100):
        self.logstash_address = (host, port)
        self.MAX_RECONNECTIONS = max_reconnections
        self.socket = None
        self.connect()

    def connect(self):
        '''connects to logstash retrying for MAX_RECONNECTIONS times on failure'''
        if self.socket is not None:
            self.socket.close()
            self.socket = None
        reconnection_attempts = 0
        while reconnection_attempts < self.MAX_RECONNECTIONS:
            try:
                self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                self.socket.connect(self.logstash_address)
                LOGGER.info("Connected to logstash at %s:%d" % self.logstash_address)
                return
            except socket.error as e:
                #waiting between 0,2,4,8,16,32,64 seconds to reconnect
                # untill shutting down completely after MAX_RECONNECTIONS tries
                sleep_time = 64 if reconnection_attempts > 6 else 2**reconnection_attempts
                LOGGER.warning("%s trying to reconnect in %d seconds" %(str(e), sleep_time))
                time.sleep(sleep_time)
                reconnection_attempts += 1
                self.socket.close()
        #if we are past
        exit(-1)
    def send_object(self, o):
        '''turns o into json and sends it to logstash'''
        msg = json.dumps(o)+"\n"
        try:
            self.socket.send(msg.encode())
        except socket.error as e:
            self.connect()
            #resend when reconnected 
            self.send_object(o)

def read_config(filename="secret.json"):
    '''reads a file secret.json and either from current directory or /etc/stream-come-true/ '''
    config_dir = ""
    working_dir = os.path.dirname(os.path.realpath(__file__))+"/"
    if os.path.isfile(working_dir+filename):
        config_dir = working_dir
    elif os.path.isfile("/etc/stream-come-true/"+filename):
        config_dir = '/etc/stream-come-true/'
    else:
        LOGGER.error("couldn't find %s in /etc/stream-come-true/ or current directory" % filename)
        exit(-1)
    with open(config_dir+filename, 'r') as f:
        return json.load(f)

def parse_comment(comment):
    """takes comment and extracts only necessary fields"""
    return {
        'text': comment.body,
        'id': comment.id,
        'subreddit':comment.subreddit.display_name,
        #is a unix timestamp
        'created_at': comment.created_utc,
        'screen_name': comment.author.name,
        'user_karma': comment.author.comment_karma
    }


if __name__ == "__main__":
    #reading secret configuration
    secret_config = read_config()
    CLIENT_ID = secret_config["CLIENT_ID"]
    CLIENT_SECRET = secret_config["CLIENT_SECRET"]
    USER_AGENT = "comment stream"

    #reading public configuration
    public_config = read_config("public.json")

    #praw client
    reddit = praw.Reddit(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, user_agent=USER_AGENT)

    #handles communication with logstash
    logstash_client = LogstashClient(public_config["logstash"]["host"], public_config["logstash"]["port"])

    #creating a comment stream for each subreddit
    subreddits = public_config["subreddits"]
    comment_streams = list(map(
        lambda subreddit: reddit.subreddit(subreddit).stream.comments(pause_after=-1),
        subreddits))

    #main loop
    #praw is not threadsafe so we just get all comments from a subreddit untill there are no comments comming in
    #and then move on to the next one, this seems to work fine
    while True:
        try:
            for comment_stream in comment_streams:
                for comment in comment_stream:
                    if comment is None:
                        break
                    logstash_client.send_object(parse_comment(comment))
        #if there is any error we just continue
        except praw.exceptions.PRAWException as e:
            LOGGER.warning(e)