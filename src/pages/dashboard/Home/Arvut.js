import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider as MuiDivider,
  makeStyles,
  Typography as MuiTypography,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import styled from 'styled-components';
import { Mic } from 'react-feather';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import parsePrometheusTextFormat from 'parse-prometheus-text-format';
import { ARVUT_URL } from '../../../shared/constants';

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Icon = styled.span`
  margin-top: 4px;
  margin-inline-end: 12px;

  svg {
    width: 32px;
    height: 32px;
    color: ${props => props.theme.palette.primary.main};
  }
`;

const EventContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EventName = styled.div`
  display: flex;
  margin-inline-end: 20px;
`;

const ConnectionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const useStyles = makeStyles({
  cardTitle: {
    fontSize: 14,
    color: '#ff0000',
  },
});

const Arvut = ({ liveEvent }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [clock, setClock] = useState('');
  const [totalConnections, setTotalConnections] = useState(0);
  const [tensConnected, setTensConnected] = useState(0);
  // TODO: add friendsFromTen variable to an array when get updates from BE
  const [, setFriendsFromTen] = useState(0);
  const user = useSelector(state => state.userReducer.info.profile);

  useEffect(() => {
    if (!liveEvent) {
      return;
    }

    const fetch = () => {
      // TODO: Change url ones new API is ready & npm un parse-prometheus-text-format
      axios('https://gxydb.kli.one/galaxy/metrics')
        .then(({ data }) => {
          const parsed = parsePrometheusTextFormat(data);
          const participants = parsed.find(
            n => n.name === 'galaxy_api_participants',
          );

          if (
            participants &&
            participants.metrics &&
            participants.metrics.length
          ) {
            const { metrics } = participants;

            setTensConnected(metrics.length);

            const total = metrics.reduce(
              (accumulator, currentValue) => accumulator + +currentValue.value,
              0,
            );
            setTotalConnections(total);

            const friendTen = metrics.find(
              m => m.labels.name === user.firstName,
            );
            if (friendTen) {
              setFriendsFromTen(+friendTen.value);
            }
          }
        })
        .catch(err => console.log(err));
    };

    fetch();

    const interval = setInterval(() => {
      fetch();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [liveEvent, user.firstName]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setClock(
        `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now
          .getSeconds()
          .toString()
          .padStart(2, '0')}`,
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card mb={6}>
      <CardHeader
        action={
          liveEvent ? (
            <Button
              variant='contained'
              color='primary'
              href={`${ARVUT_URL}/stream`}
              target='_blank'
            >
              {t('Home.watchBtn')}
            </Button>
          ) : null
        }
        title={liveEvent ? t('Home.active') : t('Home.notActive')}
        classes={{ title: classes.cardTitle }}
      />

      <CardContent>
        {liveEvent ? (
          <>
            <EventContainer>
              <EventName>
                <Icon>
                  <Mic />
                </Icon>

                <div>
                  <Typography variant='h2' fontWeight='fontWeightBold'>
                    {liveEvent.title}
                  </Typography>
                  <Typography variant='subtitle1' mt={2}>
                    {t('Home.currentEvent')}
                  </Typography>
                </div>
              </EventName>

              <Box fontSize='h2.fontSize' fontWeight='fontWeightMedium'>
                {clock}
              </Box>
            </EventContainer>

            <Divider my={6} />

            <ConnectionsContainer>
              <Box>
                <Box fontSize='h2.fontSize' fontWeight='fontWeightMedium'>
                  {totalConnections}
                </Box>
                <Typography variant='subtitle1' mt={2} color='textSecondary'>
                  {t('Home.totalConnections')}
                </Typography>
              </Box>
              <Box>
                <Box fontSize='h2.fontSize' fontWeight='fontWeightMedium'>
                  {tensConnected}
                </Box>
                <Typography variant='subtitle1' mt={2} color='textSecondary'>
                  {t('Home.tensNumber')}
                </Typography>
              </Box>
              {/* TODO Hide this section until getting updates from BE
              <Box>
                <Box fontSize='h2.fontSize' fontWeight='fontWeightMedium'>
                  {friendsFromTen}
                </Box>
                <Typography variant='subtitle1' mt={2} color='textSecondary'>
                  {t('Home.tenFriends')}
                </Typography>
              </Box> */}
            </ConnectionsContainer>
          </>
        ) : (
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h3'>{t('Home.noLiveEvent')}</Typography>
            <Button
              variant='outlined'
              color='secondary'
              href={`${ARVUT_URL}/stream`}
              target='_blank'
            >
              {t('Home.watchRecordedBtn')}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Arvut;
