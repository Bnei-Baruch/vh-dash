import React, {useEffect, useState} from 'react';
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
import { useTranslation } from 'react-i18next';
import {connect} from 'react-redux';
import {
  GOOGLE_CALENDAR_API_KEY,
  GOOGLE_CALENDAR_EN,
  GOOGLE_CALENDAR_ES,
  GOOGLE_CALENDAR_HE,
  GOOGLE_CALENDAR_RU
} from '../../../shared/constants';

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
  background-color: ${red[500]} !important;
  color: white;
  width: 50px;
`;

const CardHead = styled(CardHeader)`
@media(max-width: 600px) {
  display: block;
  >div {
    margin: 15px 0px;
  }
  .MuiButton-root {
    padding: 5px 10px !important;
  }
}
`

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
  const { t } = useTranslation();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [refreshToday, setRefreshToday] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [day, setDay] = useState(TODAY);
  const [events, setEvents] = useState([]);
  const [eventsForToday, setEventsForToday] = useState([]);
  const [eventsTimeout, setEventsTimeout] = useState(0);

  const eventsErr = (err) => {
    setRefresh(false);
    setLoading(false);
    setErrorMessage('Could not load events');
    console.error(err);
  };

  const onDayChange = ({target}) => {
    const newDay = parseInt(target.tagName === 'SPAN' ? target.parentNode.value : target.value);
    setDay(newDay);
    setRefresh(true);
  };

  useEffect(() => {
    const gapi = window.gapi;

    gapi.load('client:auth2', () => {
      const initClient = async () => {
        const {client: {load, setApiKey}} = gapi;

        setApiKey(GOOGLE_CALENDAR_API_KEY);
        await load('https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest');

        setAuthenticated(true);
      };

      initClient()
        .catch((err) => {
          setLoading(false);
          eventsErr(err);
        });
    });
  }, []);

  useEffect(() => {
    if (!authenticated || !(refresh || refreshToday)) {
      return;
    }

    const getEvents = async () => {
      setErrorMessage('');

      const padDate = (date) => date.toString().padStart(2, '0');
      const parseDate = (date) => `${date.getFullYear()}-${padDate(date.getMonth() + 1)}-${padDate(date.getDate())}`;

      const now = new Date();
      const currentDate = new Date(now.setDate(now.getDate() + (refreshToday ? 0 : day)));

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
        const live = nowMs >= start.getTime() && nowMs < end.getTime();
        const timeStart = `${padDate(start.getHours())}:${padDate(start.getMinutes())}`;

        return {
          id: i.id,
          title: i.summary,
          timeStart,
          start: start.getTime(),
          end: end.getTime(),
          live
        };
      });

      if (day === TODAY || refreshToday) {
        setEventsForToday(calendarEvents);
      }

      if (day === TODAY || (day !== TODAY && !refreshToday)) {
        setEvents(calendarEvents);
      }

      setRefresh(false);
      setRefreshToday(false);
      setLoading(false);
    };

    getEvents().catch(eventsErr);
  }, [authenticated, refresh, refreshToday, day, language]);

  useEffect(() => {
    const nowMs = new Date().getTime();
    const liveEvent = eventsForToday.find(e => nowMs >= e.start && nowMs < e.end);
    let timeout;

    if (liveEvent) {
      // Scroll to the live event
      setTimeout(() => {
        const el = document.getElementById(liveEvent.id)
        el && el.scrollIntoView({behavior: 'smooth', block: 'end'});
      });

      onLiveEvent(liveEvent);

      timeout = liveEvent.end - nowMs;
    } else {
      onLiveEvent(null);

      const nextEvent = eventsForToday.find(e => e.start >= nowMs);

      if (nextEvent) {
        timeout = nextEvent.start - nowMs;
      } else {
        const tomorrow = new Date().setDate(new Date().getDate() + 1);
        const midnightMs = new Date(tomorrow).setHours(0, 0, 0, 0);
        timeout = midnightMs - nowMs;
      }
    }

    setEventsTimeout(timeout);
  }, [eventsForToday, onLiveEvent]);

  useEffect(() => {
    if (eventsTimeout < 0) {
      return;
    }

    const timer = setTimeout(() => {
      setRefreshToday(true);
    }, eventsTimeout);

    return () => {
      clearTimeout(timer);
    };
  }, [eventsTimeout]);

  useEffect(() => {
    setRefresh(true);
  }, [language]);

  return (
    <Card mb={6}>
      <CardHead
        action={
          <CardActionHeader>
            <StaticIcon aria-label="calendar">
              <CalendarIcon/>
            </StaticIcon>

            <CalendarButtonGroup color="primary" onClick={onDayChange} aria-label="primary button group">
              <Button variant={day === TODAY ? 'contained' : 'outlined'}
                      color={day === TODAY ? 'primary' : 'default'}
                      value={TODAY}>{t('Home.today')}</Button>
              <Button variant={day === TOMORROW ? 'contained' : 'outlined'}
                      color={day === TOMORROW ? 'primary' : 'default'}
                      value={TOMORROW}>{t('Home.tomorrow')}</Button>
              <Button variant={day === YESTERDAY ? 'contained' : 'outlined'}
                      color={day === YESTERDAY ? 'primary' : 'default'}
                      value={YESTERDAY}>{t('Home.yesterday')}</Button>
            </CalendarButtonGroup>

            <IconButton aria-label="refresh" color="primary" disabled={loading || refresh}
                        onClick={() => setRefresh(true)}>
              <RefreshCw/>
            </IconButton>
          </CardActionHeader>
        }
        title={t('Home.events')}
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
            <Typography variant="h3">{t('Home.noEvent')}</Typography>
        }

        <Typography variant="h3">{errorMessage}</Typography>
      </CardContent>
    </Card>
  );
};

export default connect(store => ({settings: store.settingsReducer}))(Calendar);
