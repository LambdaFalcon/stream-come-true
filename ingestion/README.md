### Ingestion
We use logstash to ingest data into elastic.\
To check if a logstash configuration is valid run 

> ```/<your-path-to-logstash>/bin/logstash -f your-config.conf --config.test_and_exit```

To start ingesting with automatic reloading on configuration changes run

> ```/<your-path-to-logstash>/bin/logstash -f your-config.conf --config.reload.automatic```

### Running logstash on VM
Place your configuration file in
> ```/etc/logstash/conf.d/```

Make sure your configuration is valid using
>```sudo -u logstash /usr/share/logstash/bin/logstash --path.settings /etc/logstash -t```

Then start (or restart) the logstash service using
> ```sudo systemctl start logstash```

You can find the logs under
> ```/var/log/logstash/logstash-plain.log ```