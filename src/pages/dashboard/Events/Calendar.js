import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import {Calendar as CalendarIcon} from 'react-feather';
import {grey, red} from '@material-ui/core/colors';

const TODAY = 0;
const TOMORROW = 1;
const YESTERDAY = -1;

const CalendarButton = styled(IconButton)`
  margin-inline-end: 16px;
  color: ${grey[500]};
`;

const LiveChip = styled(Chip)`
  background-color: ${red[500]};
  color: white;
  width: 50px;
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
  max-height: 500px;
`;

const TimeCell = styled(TableCell)`
  width: 52px;
`;

const TitleCell = styled(TableCell)`
  font-size: 18px;
  padding-left: 8px;
  padding-right: 8px;
`;

const Calendar = () => {
  const [day, setDay] = useState(TODAY);
  const [events, setEvents] = useState([]);

  const padDate = (date) => date.toString().padStart(2, '0');

  const parseDate = (date) => `${date.getFullYear()}-${padDate(date.getMonth() + 1)}-${padDate(date.getDate())}`;

  const onDayChange = ({target}) => {
    const newDay = parseInt(target.tagName === 'SPAN' ? target.parentNode.value : target.value);
    if (newDay !== day) {
      setDay(newDay);
      const now = new Date();
      const date = new Date(now.setDate(now.getDate() + newDay));
      getEvents(parseDate(date)).catch(err => console.error('Error getting calendar events', err))
    }
  };

  const getEvents = async (date) => {
    const {result} = await window.gapi.client.calendar.events.list({
      // calendarId: 'noubve6l8fhi83iu4qucd2ekok@group.calendar.google.com',
      calendarId: '4ntftm9sqt1jid8jasjgsjb7n0@group.calendar.google.com',
      timeMin: `${date}T00:00:00Z`,
      timeMax: `${date}T23:59:59Z`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    const toMs = (date) => ((date.getHours() * 60) + date.getMinutes()) * 6000;
    const timeNowMs = toMs(new Date());
    const items = result.items
      .filter(i => i.summary)
      .map(i => {
        const start = new Date(i.start.dateTime);
        const timeStartMs = toMs(start);
        const timeEndMs = toMs(new Date(i.end.dateTime));
        const live = timeNowMs >= timeStartMs && timeNowMs < timeEndMs;
        const timeStart = `${padDate(start.getHours())}:${padDate(start.getMinutes())}`;

        return {id: i.id, start: start, timeStart, timeStartMs, live, title: i.summary};
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
  };

  useEffect(() => {
    const gapi = window.gapi;

    gapi.load('client:auth2', () => {
      const initClient = async () => {
        const {client} = gapi;

        client.setApiKey('REMOVED_GOOGLE_API_KEY');
        await client.load('https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest');
        await getEvents(parseDate(new Date()));
      };

      initClient().catch((err) => console.error('Error loading GAPI client for API', err));
    });
  }, []);

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <>
            <CalendarButton aria-label="open calendar">
              <CalendarIcon/>
            </CalendarButton>

            <ButtonGroup color="primary" onClick={onDayChange} aria-label="outlined primary button group">
              <Button variant={day === TODAY ? 'contained' : 'outlined'}
                      color={day === TODAY ? 'primary' : 'default'}
                      value={TODAY}>Today</Button>
              <Button variant={day === TOMORROW ? 'contained' : 'outlined'}
                      color={day === TOMORROW ? 'primary' : 'default'}
                      value={TOMORROW}>Tomorrow</Button>
              <Button variant={day === YESTERDAY ? 'contained' : 'outlined'}
                      color={day === YESTERDAY ? 'primary' : 'default'}
                      value={YESTERDAY}>Yesterday</Button>
            </ButtonGroup>
          </>
        }
        title="Events"
      />

      <Paper>
        <TableWrapper>
          <Table>
            <TableBody>
              {events.map(event => (
                <TableRow key={event.id}>
                  <TimeCell>{event.live ?
                    <LiveChip size="small" label="Live"/> :
                    <Chip size="small" label={event.timeStart}/>}
                  </TimeCell>
                  <TitleCell>{event.title}</TitleCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>
    </Card>
  );
};

export default Calendar;
