# Virtual Home User Dashboard

- events
- galaxy
- feed
- study material
- account management
- profile management

## Events

### Getting calendar events

We are getting calendar events using google calendar. You can find more
info [here](https://developers.google.com/calendar/v3/reference/events/list). 

The events schedule will automatically refresh when:

- there is a live event – the schedule will be refreshed when the event ends
- there is no live event and later the same day there will be an event – once the event starts the schedule will be refreshed
- there are no more events for the day – the schedule will refresh on the next day, at midnight

### Getting participants

The API to get participants during live event is https://gxydb.kli.one/galaxy/metrics  



# How to build
---
- Clone the master repository : ```git clone <url>```

- Create a branch - potentially with name if the issue / feature - like BUGFIX12345 ```git checkout -b BUGFIX/12345```

- Once we have tested it locally, push it to the remote repository
		git push origin BUGIX/12345

- Create a merge request to master from UI, which will get deployed in staging.

- Once we are happy with all the changes in staging and we want to move to production.

- Create a tag in gitlab - which will deploy the same in production.
  
---
