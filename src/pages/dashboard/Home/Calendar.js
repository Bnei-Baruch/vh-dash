import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Calendar as CalendarIcon } from "lucide-react";
import { red, grey } from "@material-ui/core/colors";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { EVENTS_API_URL } from "../../../shared/constants";


const Wrapper = styled.div`
  background: ${(p) => p.theme.palette.background.paper};
  border-radius: ${(p) => p.theme.spacing(3)}px;
  padding: ${(p) => p.theme.spacing(6)}px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid ${grey[200]};
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 440px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing(2)}px;
  margin-bottom: ${(p) => p.theme.spacing(5)}px;
  width: 100%;
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
  background: ${(p) => p.theme.palette.background.default};
  border: 1px solid ${grey[200]};
  border-radius: ${(p) => p.theme.spacing(2)}px;
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

const Calendar = ({ settings: { language } }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [eventsTimeout, setEventsTimeout] = useState(0);

  const eventsErr = useCallback((err) => {
    setRefresh(false);
    setLoading(false);
    setErrorMessage(t("Home.calendarError"));
    console.error(err);
  }, [t]);

  useEffect(() => {
    if (!refresh) {
      return;
    }

    const getEvents = async () => {
      setErrorMessage("");

      const pad = (n) => n.toString().padStart(2, "0");
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

      const normalizeTime = (time) => {
        const [h, m] = time.split(":");
        return `${pad(h)}:${pad(m)}`;
      };

      const response = await fetch(EVENTS_API_URL);
      if (!response.ok) throw new Error(`Events API error: ${response.status}`);
      const items = await response.json();

      const todayItems = items.filter((item) => item.date === todayStr);
      const nowMs = Date.now();

      const calendarEvents = todayItems.map((item) => {
        const timeStart = normalizeTime(item.startTime);
        const start = new Date(`${item.date}T${timeStart}`).getTime();
        const end = new Date(`${item.date}T${normalizeTime(item.endTime)}`).getTime();
        const live = nowMs >= start && nowMs < end;

        return {
          id: item.id,
          title: item.title[language] || item.title.en,
          timeStart,
          start,
          end,
          live,
        };
      });

      calendarEvents.sort((a, b) => a.start - b.start);
      setEvents(calendarEvents);
      setRefresh(false);
      setLoading(false);
    };

    getEvents().catch(eventsErr);
  }, [refresh, language, eventsErr]);

  useEffect(() => {
    const nowMs = new Date().getTime();
    const liveEvent = events.find(
      (e) => nowMs >= e.start && nowMs < e.end
    );
    let timeout;

    if (liveEvent) {
      // Scroll to the live event
      setTimeout(() => {
        const el = document.getElementById(liveEvent.id);
        el && el.scrollIntoView({ behavior: "smooth", block: "end" });
      });

      timeout = liveEvent.end - nowMs;
    } else {
      const nextEvent = events.find((e) => e.start >= nowMs);

      if (nextEvent) {
        timeout = nextEvent.start - nowMs;
      } else {
        const tomorrow = new Date().setDate(new Date().getDate() + 1);
        const midnightMs = new Date(tomorrow).setHours(0, 0, 0, 0);
        timeout = midnightMs - nowMs;
      }
    }

    setEventsTimeout(timeout);
  }, [events]);

  useEffect(() => {
    if (eventsTimeout < 0) {
      return;
    }

    const timer = setTimeout(() => {
      setRefresh(true);
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
      <Header>
        <HeaderIcon>
          <CalendarIcon size={24} />
        </HeaderIcon>
        <HeaderTitle>{t("Home.events")}</HeaderTitle>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          component="a"
          href="https://events.kli.one/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginInlineStart: "auto" }}
        >
          {t("Home.viewAllEvents")}
        </Button>
      </Header>

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
