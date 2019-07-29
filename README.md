# Stream come true

> Stream comparison and analysis for Reddit and Twitter

This project was created in the spring semester course _Visual Analytics Atelier_ taught by Marco D'Ambros.  
The team was composed by four students: [Brenda Ruiz](https://www.linkedin.com/in/brenda-ruiz-074001a2), [Alexander Camenzind](https://www.linkedin.com/in/alexander-camenzind-421517154/), [Aron Fiechter](https://www.linkedin.com/in/aron-fiechter-39192180/), and Bojken Sina.

Stream come true is a visualization platform for Twitter and Reddit data with a live stream mode and a historical mode. The platform is designed to compare topics across the two social networks.
We collected more than a million tweets and over 3 million Reddit comments from news accounts and subreddits over a period of one month.
Which Twitter accounts and subreddits are followed is configurable.

This repository was originally created on GitLab and was deployed on a server where an ElasticSearch instance was already running and ingesting data using LogStash; the necessary code is in the `ingestion` folder.
