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
import {
  GOOGLE_CALENDAR_API_KEY,
  GOOGLE_CALENDAR_EN,
  GOOGLE_CALENDAR_ES,
  GOOGLE_CALENDAR_HE,
  GOOGLE_CALENDAR_RU
} from '../../../shared/constants';
import {connect} from 'react-redux';

const TODAY = 0;
const TOMORROW = 1;
const YESTERDAY = -1;

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
  max-height: 500px;
  background-color: #f7f9fc;
  border: 1px solid #e0e0e0;
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

const CALENDAR_LANGUAGE = {
  en: GOOGLE_CALENDAR_EN,
  he: GOOGLE_CALENDAR_HE,
  ru: GOOGLE_CALENDAR_RU,
  es: GOOGLE_CALENDAR_ES
};

const Calendar = ({onLiveEvent, settings: {language}}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [day, setDay] = useState(TODAY);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const eventsErr = (err) => {
    setErrorMessage('Could not load events');
    console.error(err);
  };

  const onDayChange = ({target}) => {
    const newDay = parseInt(target.tagName === 'SPAN' ? target.parentNode.value : target.value);
    if (newDay !== day) {
      setDay(newDay);
      const now = new Date();
      const date = new Date(now.setDate(now.getDate() + newDay));
      setCurrentDate(date);
    }
  };

  const getEvents = useCallback(async () => {
    setErrorMessage('');

    const padDate = (date) => date.toString().padStart(2, '0');
    const parseDate = (date) => `${date.getFullYear()}-${padDate(date.getMonth() + 1)}-${padDate(date.getDate())}`;

    const {result: {items}} = await window.gapi.client.calendar.events.list({
      calendarId: CALENDAR_LANGUAGE[language] || GOOGLE_CALENDAR_EN,
      timeMin: `${parseDate(currentDate)}T00:00:00Z`,
      timeMax: `${parseDate(currentDate)}T23:59:59Z`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      singleEvents: true,
      orderBy: 'startTime'
    });

    const nowMs = new Date().getTime();
    const calendarEvents = items.map(i => {
      const start = new Date(i.start.dateTime);
      const end = new Date(i.end.dateTime);
      const live = nowMs >= start.getTime() && nowMs < end.getTime() && day === TODAY;
      const timeStart = `${padDate(start.getHours())}:${padDate(start.getMinutes())}`;

      return {
        id: i.id,
        title: i.summary,
        timeStart,
        end,
        live
      };
    });

    setEvents(calendarEvents);
  }, [day, currentDate, language]);

  const refreshEvents = useCallback(() => {
    setRefreshing(true);
    getEvents()
      .then(() => setRefreshing(false))
      .catch(eventsErr);
  }, [getEvents]);

  useEffect(() => {
    const gapi = window.gapi;

    if (!authenticated) {
      gapi.load('client:auth2', () => {
        const initClient = async () => {
          const {client: {load, setApiKey}} = gapi;

          setApiKey(GOOGLE_CALENDAR_API_KEY);
          await load('https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest');
          setAuthenticated(true);

          await getEvents();
        };

        initClient()
          .then(() => setLoading(false))
          .catch((err) => {
            setLoading(false);
            eventsErr(err);
          });
      });
    } else {
      refreshEvents();
    }
  }, [authenticated, refreshEvents, getEvents]);

  useEffect(() => {
    let timer;

    const liveEvent = events.find((item) => item.live);

    if (liveEvent) {

      // Scroll to the live event
      setTimeout(() => {
        const el = document.getElementById(liveEvent.id)
        el && el.scrollIntoView({behavior: 'smooth', block: 'end'});
      });

      onLiveEvent(liveEvent);

      const timeoutMS = liveEvent.end.getTime() - new Date().getTime();

      timer = setTimeout(() => {
        refreshEvents();
      }, timeoutMS);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [events, refreshEvents, onLiveEvent]);

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

            <IconButton aria-label="refresh" color="primary" disabled={loading || refreshing} onClick={refreshEvents}>
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

export default connect(store => ({settings: store.settingsReducer}))(Calendar);
