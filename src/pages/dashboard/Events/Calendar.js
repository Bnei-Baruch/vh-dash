import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Button, ButtonGroup, Card, CardHeader, Paper, Table, TableBody, TableCell, TableRow} from '@material-ui/core';
import {Calendar as CalendarIcon} from 'react-feather';

const TODAY = 'today';
const TOMORROW = 'tomorrow';
const YESTERDAY = 'yesterday';

const SmallButton = styled(Button)`
  padding: 8px;
  min-width: 0;
  color: ${props => props.theme.palette.grey[500]};
  margin-inline-end: 12px;
`;

const Calendar = () => {
  const [day, setDay] = useState(TODAY);
  const [events, setEvents] = useState([]);

  const onDayChange = ({target}) => {
    const value = target.tagName === 'SPAN' ? target.parentNode.value : target.value;
    setDay(value);
  };

  useEffect(() => {
    const gapi = window.gapi;

    gapi.load('client:auth2', () => {
      const initClient = async () => {
        const {client} = gapi;

        client.setApiKey('REMOVED_GOOGLE_API_KEY');
        await client.load('https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest');

        console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
        const {result} = await client.calendar.events.list({
          // calendarId: 'noubve6l8fhi83iu4qucd2ekok@group.calendar.google.com',
          calendarId: '4ntftm9sqt1jid8jasjgsjb7n0@group.calendar.google.com',
          timeMax: "2020-12-21T23:59:59Z",
          timeMin: "2020-12-21T00:00:00Z",
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });

        const start = new Date(new Date().setHours(0, 0, 0));
        const end = new Date(new Date().setHours(23, 59, 59));
        const items = result.items.filter(
          i => i.summary &&
          i.start && new Date(i.start.dateTime) >= start &&
          i.end && new Date(i.end.dateTime) <= end
        );

        setEvents(items);
        console.log(result);
      };

      initClient().catch((err) => console.error('Error loading GAPI client for API', err))
    });

    // window.gapi.client.calendar.events.list({
    //   "calendarId": "4ntftm9sqt1jid8jasjgsjb7n0@group.calendar.google.com",
    //   "timeZone": "Europe/Sofia"
    // })
    //   .then(function(response) {
    //       // Handle the results here (response.result has the parsed body).
    //       console.log("Response", response);
    //     },
    //     function(err) { console.error("Execute error", err); });
  }, []);

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <>
            <SmallButton size="small" mr={2}>
              <CalendarIcon/>
            </SmallButton>

            <ButtonGroup color="primary" onClick={onDayChange} aria-label="outlined primary button group">
              <Button variant={day === TODAY ? 'contained' : 'outlined'} value={TODAY}>Today</Button>
              <Button variant={day === TOMORROW ? 'contained' : 'outlined'} value={TOMORROW}>Tomorrow</Button>
              <Button variant={day === YESTERDAY ? 'contained' : 'outlined'} value={YESTERDAY}>Yesterday</Button>
            </ButtonGroup>
          </>
        }
        title="Events"
      />

      <Paper>
        <Table>
          <TableBody>
            {events.map(event => (
              <TableRow key={event.id}>
                <TableCell>{event.start ? event.start.dateTime : ''}</TableCell>
                <TableCell>{event.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Card>
  );
};

export default Calendar;
