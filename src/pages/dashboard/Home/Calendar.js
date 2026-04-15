import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { RefreshCw } from "react-feather";
import { Calendar as CalendarIcon } from "lucide-react";
import { red, grey } from "@material-ui/core/colors";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  GOOGLE_CALENDAR_API_KEY,
  GOOGLE_CALENDAR_EN,
  GOOGLE_CALENDAR_ES,
  GOOGLE_CALENDAR_HE,
  GOOGLE_CALENDAR_RU,
} from "../../../shared/constants";

const TODAY = 0;
const TOMORROW = 1;
const YESTERDAY = -1;

const Wrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 440px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  flex: 1;
`;

const HeaderTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${(p) => p.theme.palette.text.primary};
  margin: 0;
`;

const HeaderIcon = styled.div`
  color: ${(p) => p.theme.palette.primary.main};
  display: flex;
  align-items: center;
`;

const CardActionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CalendarButtonGroup = styled(ButtonGroup)`
  margin: 0 8px;
`;

const Spinner = styled.div`
  text-align: center;
  padding: 40px 0;
`;

const LiveChip = styled(Chip)`
  background-color: ${red[500]} !important;
  color: white;
  width: 50px;
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-height: 320px;
  background-color: #f7f9fc;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding-right: 10px;
  scrollbar-width: thin;
  scrollbar-color: ${grey[300]} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${grey[300]};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${grey[400]};
  }
`;

const TimeCell = styled(TableCell)`
  width: 52px;
  padding: 12px 8px;
  border: none;
`;

const TitleCell = styled(TableCell)`
  font-size: 15px;
  font-weight: 500;
  color: ${(p) => p.theme.palette.text.primary};
  padding: 12px 8px;
  border: none;
`;

const EmptyText = styled(Typography)`
  && {
    padding: 20px 0;
    color: ${(p) => p.theme.palette.text.secondary};
  }
`;

const ErrorText = styled(Typography)`
  && {
    padding: 20px 0;
    color: ${(p) => p.theme.palette.error.main};
  }
`;

const CALENDAR_LANGUAGE = {
  en: GOOGLE_CALENDAR_EN,
  he: GOOGLE_CALENDAR_HE,
  ru: GOOGLE_CALENDAR_RU,
  es: GOOGLE_CALENDAR_ES,
};

const Calendar = ({ onLiveEvent, settings: { language } }) => {
  const { t } = useTranslation();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [refreshToday, setRefreshToday] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [day, setDay] = useState(TODAY);
  const [events, setEvents] = useState([]);
  const [eventsForToday, setEventsForToday] = useState([]);
  const [eventsTimeout, setEventsTimeout] = useState(0);

  const eventsErr = (err) => {
    setRefresh(false);
    setLoading(false);
    setErrorMessage("Could not load events");
    console.error(err);
  };

  const onDayChange = ({ target }) => {
    const newDay = parseInt(
      target.tagName === "SPAN" ? target.parentNode.value : target.value
    );
    setDay(newDay);
    setRefresh(true);
  };

  useEffect(() => {
    const gapi = window.gapi;

    gapi.load("client:auth2", () => {
      const initClient = async () => {
        const {
          client: { load, setApiKey },
        } = gapi;

        setApiKey(GOOGLE_CALENDAR_API_KEY);
        await load(
          "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
        );

        setAuthenticated(true);
      };

      initClient().catch((err) => {
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
      setErrorMessage("");

      const padDate = (date) => date.toString().padStart(2, "0");
      const parseDate = (date) =>
        `${date.getFullYear()}-${padDate(date.getMonth() + 1)}-${padDate(
          date.getDate()
        )}`;

      const now = new Date();
      const currentDate = new Date(
        now.setDate(now.getDate() + (refreshToday ? 0 : day))
      );

      const {
        result: { items },
      } = await window.gapi.client.calendar.events.list({
        calendarId: CALENDAR_LANGUAGE[language] || GOOGLE_CALENDAR_EN,
        timeMin: `${parseDate(currentDate)}T00:00:00Z`,
        timeMax: `${parseDate(currentDate)}T23:59:59Z`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        singleEvents: true,
        orderBy: "startTime",
      });

      const nowMs = new Date().getTime();
      const calendarEvents = items.map((i) => {
        const start = new Date(i.start.dateTime);
        const end = new Date(i.end.dateTime);
        const live = nowMs >= start.getTime() && nowMs < end.getTime();
        const timeStart = `${padDate(start.getHours())}:${padDate(
          start.getMinutes()
        )}`;

        return {
          id: i.id,
          title: i.summary,
          timeStart,
          start: start.getTime(),
          end: end.getTime(),
          live,
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
    const liveEvent = eventsForToday.find(
      (e) => nowMs >= e.start && nowMs < e.end
    );
    let timeout;

    if (liveEvent) {
      // Scroll to the live event
      setTimeout(() => {
        const el = document.getElementById(liveEvent.id);
        el && el.scrollIntoView({ behavior: "smooth", block: "end" });
      });

      onLiveEvent(liveEvent);

      timeout = liveEvent.end - nowMs;
    } else {
      onLiveEvent(null);

      const nextEvent = eventsForToday.find((e) => e.start >= nowMs);

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
    <Wrapper>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, width: '100%' }}>
        <Header>
          <HeaderIcon>
            <CalendarIcon size={24} />
          </HeaderIcon>
          <HeaderTitle>{t("Home.events")}</HeaderTitle>
        </Header>

        <CardActionHeader>
          <CalendarButtonGroup
            color="primary"
            onClick={onDayChange}
            aria-label="primary button group"
          >
            <Button
              variant={day === TODAY ? "contained" : "outlined"}
              color={day === TODAY ? "primary" : "default"}
              value={TODAY}
            >
              {t("Home.today")}
            </Button>
            <Button
              variant={day === TOMORROW ? "contained" : "outlined"}
              color={day === TOMORROW ? "primary" : "default"}
              value={TOMORROW}
            >
              {t("Home.tomorrow")}
            </Button>
            <Button
              variant={day === YESTERDAY ? "contained" : "outlined"}
              color={day === YESTERDAY ? "primary" : "default"}
              value={YESTERDAY}
            >
              {t("Home.yesterday")}
            </Button>
          </CalendarButtonGroup>
        </CardActionHeader>
      </div>

      <div>
        {loading ? (
          <Spinner>
            <CircularProgress />
          </Spinner>
        ) : events.length ? (
          <TableWrapper>
            <Table>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id} id={event.id}>
                    <TimeCell>
                      {event.live ? (
                        <LiveChip size="small" label="Live" />
                      ) : (
                        <Chip size="small" label={event.timeStart} />
                      )}
                    </TimeCell>
                    <TitleCell>
                      {event.live ? <b>{event.title}</b> : event.title}
                    </TitleCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        ) : (
          <EmptyText variant="h3">{t("Home.noEvent")}</EmptyText>
        )}

        {errorMessage && (
          <ErrorText variant="h3">{errorMessage}</ErrorText>
        )}
      </div>
    </Wrapper>
  );
};

export default connect((store) => ({ settings: store.settingsReducer }))(
  Calendar
);
