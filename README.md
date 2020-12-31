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


