### Ingestion
We use logstash to ingest data into elastic.\
To check if a logstash configuration is valid run 

> ```/<your-path-to-logstash>/bin/logstash -f your-config.conf --config.test_and_exit```

To start ingesting with automatic reloading on configuration changes run

> ```/<your-path-to-logstash>/bin/logstash -f your-config.conf --config.reload.automatic```