import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';
import {Calendar as CalendarIcon, RefreshCw} from 'react-feather';
import {grey, red} from '@material-ui/core/colors';

const TODAY = 0;
const TOMORROW = 1;
const YESTERDAY = -1;
const ERROR_MESSAGE = 'Could not load events';

const StaticIcon = styled(Icon)`
  color: ${grey[500]};
`;

const CardActionHeader = styled.div`
  display: flex;
  align-items: center;
`;

const CalendarButtonGroup = styled(ButtonGroup)`
  margin: 0 16px;
`;

const Spinner = styled.div`
  text-align: center;
`;

const LiveChip = styled(Chip)`
  background-color: ${red[500]};
  color: white;
  width: 50px;
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-height: 502px;
  background-color: #F7F9FC;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
`;

const TimeCell = styled(TableCell)`
  width: 52px;
  padding: 12px 8px;
  border: none;
`;

const TitleCell = styled(TableCell)`
  font-size: 18px;
  padding: 12px 8px;
  border: none;
`;

const Calendar = ({onLiveEvent}) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [day, setDay] = useState(TODAY);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const padDate = (date) => date.toString().padStart(2, '0');

  const parseDate = (date) => `${date.getFullYear()}-${padDate(date.getMonth() + 1)}-${padDate(date.getDate())}`;

  const onDayChange = ({target}) => {
    const newDay = parseInt(target.tagName === 'SPAN' ? target.parentNode.value : target.value);
    if (newDay !== day) {
      setDay(newDay);
      const now = new Date();
      const date = new Date(now.setDate(now.getDate() + newDay));
      setCurrentDate(date);
      getEvents(date, newDay).catch(err => console.error('Error getting calendar events', err))
    }
  };

  const getEvents = useCallback(async (date, selectedDay = day) => {
    setErrorMessage('');

    const {result} = await window.gapi.client.calendar.events.list({
      // calendarId: 'noubve6l8fhi83iu4qucd2ekok@group.calendar.google.com',
      calendarId: '4ntftm9sqt1jid8jasjgsjb7n0@group.calendar.google.com',
      timeMin: `${parseDate(date)}T00:00:00Z`,
      timeMax: `${parseDate(date)}T23:59:59Z`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    const now = new Date();
    const toMs = (d) => ((d.getHours() * 60) + d.getMinutes()) * 6000;
    const timeNowMs = toMs(now);
    const items = result.items
      .filter(i => i.summary)
      .map(i => {
        const start = new Date(i.start.dateTime);
        const originalEnd = new Date(i.end.dateTime);
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), originalEnd.getHours(), originalEnd.getMinutes());
        const timeStartMs = toMs(start);
        const timeEndMs = toMs(end);
        const live = timeNowMs >= timeStartMs && timeNowMs < timeEndMs && selectedDay === TODAY;
        const timeStart = `${padDate(start.getHours())}:${padDate(start.getMinutes())}`;

        return {id: i.id, start: start, end, timeStart, timeStartMs, live, title: i.summary, originalEnd: i.end.dateTime};
      })
      .sort((a, b) => b.start - a.start)
      .reduce((accumulator, currentValue) => {
        if (!accumulator.find(i => i.timeStart === currentValue.timeStart)) {
          accumulator.push(currentValue);
        }

        return accumulator;
      }, [])
      .sort((a, b) => a.timeStartMs - b.timeStartMs);

    setEvents(items);
  }, []);

  useEffect(() => {
    const gapi = window.gapi;

    gapi.load('client:auth2', () => {
      const initClient = async () => {
        const {client} = gapi;

        client.setApiKey('REMOVED_GOOGLE_API_KEY');
        await client.load('https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest');
        await getEvents(currentDate);
      };

      initClient()
        .then(() => setLoading(false))
        .catch((err) => {
          setLoading(false);
          setErrorMessage(ERROR_MESSAGE);
          console.error('Error loading GAPI client for API', err);
        });
    });
  }, []);

  useEffect(() => {
    let timer;

    const liveEvent = events.find((item) => item.live);

    if (liveEvent) {

      // Scroll to the live event
      setTimeout(() => {
        const el = document.getElementById(liveEvent.id)
        el && el.scrollIntoView({behavior: 'smooth', block: 'end'});
      }, 0);

      onLiveEvent(liveEvent);

      const timeoutMS = liveEvent.end.getTime() - new Date().getTime();
      console.log(timeoutMS);
      timer = setTimeout(() => {
        getEvents(currentDate).catch(err => {
          setErrorMessage(ERROR_MESSAGE);
          console.error(err);
        });
      }, timeoutMS);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [events]);

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <CardActionHeader>
            <StaticIcon aria-label="calendar">
              <CalendarIcon/>
            </StaticIcon>

            <CalendarButtonGroup color="primary" onClick={onDayChange} aria-label="primary button group">
              <Button variant={day === TODAY ? 'contained' : 'outlined'}
                      color={day === TODAY ? 'primary' : 'default'}
                      value={TODAY}>Today</Button>
              <Button variant={day === TOMORROW ? 'contained' : 'outlined'}
                      color={day === TOMORROW ? 'primary' : 'default'}
                      value={TOMORROW}>Tomorrow</Button>
              <Button variant={day === YESTERDAY ? 'contained' : 'outlined'}
                      color={day === YESTERDAY ? 'primary' : 'default'}
                      value={YESTERDAY}>Yesterday</Button>
            </CalendarButtonGroup>

            <IconButton aria-label="refresh" color="primary" onClick={() => getEvents(currentDate)}>
              <RefreshCw/>
            </IconButton>
          </CardActionHeader>
        }
        title="Events"
      />

      <CardContent>
        {
          loading ?
            <Spinner>
              <CircularProgress/>
            </Spinner>
            : events.length ?
            <TableWrapper>
              <Table>
                <TableBody>
                  {events.map(event => (
                    <TableRow key={event.id} id={event.id}>
                      <TimeCell>{event.live ?
                        <LiveChip size="small" label="Live"/> :
                        <Chip size="small" label={event.timeStart}/>}
                      </TimeCell>
                      <TitleCell>{event.live ? <b>{event.title}</b> : event.title}</TitleCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>
            :
            <Typography variant="h3">No events</Typography>
        }

        <Typography variant="h3">{errorMessage}</Typography>
      </CardContent>
    </Card>
  );
};

export default Calendar;
