import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider as MuiDivider,
  Typography as MuiTypography
} from '@material-ui/core';
import {spacing} from '@material-ui/system';
import styled from 'styled-components';
import {Mic} from 'react-feather';
import axios from 'axios';
import {connect} from 'react-redux';
import parsePrometheusTextFormat from 'parse-prometheus-text-format';
import {ARVUT_URL} from '../../../shared/constants';

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

const Arvut = ({liveEvent, profile: {tenName}}) => {
  const [clock, setClock] = useState('');
  const [totalConnections, setTotalConnections] = useState(0);
  const [tensConnected, setTensConnected] = useState(0);
  const [friendsFromTen, setFriendsFromTen] = useState(0);

  useEffect(() => {
    if (!liveEvent) {
      return;
    }

    const fetch = () => {
      // TODO: Change url ones new API is ready & npm un parse-prometheus-text-format
      axios('https://gxydb.kli.one/galaxy/metrics')
        .then(({data}) => {
          const parsed = parsePrometheusTextFormat(data);
          const participants = parsed.find(n => n.name === 'galaxy_api_participants');

          if (participants && participants.metrics && participants.metrics.length) {
            const {metrics} = participants;

            setTensConnected(metrics.length);

            const total = metrics.reduce((accumulator, currentValue) => accumulator + +currentValue.value, 0);
            setTotalConnections(total);

            const friendTen = metrics.find(m => m.labels.name === tenName);
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
  }, [liveEvent, tenName]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setClock(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <Button variant="contained" color="primary" href={`${ARVUT_URL}/stream`} target="_blank">Watch</Button>
        }
        title="Arvut"
      />

      <CardContent>
        {liveEvent ?
          <>
            <EventContainer>
              <EventName>
                <Icon>
                  <Mic/>
                </Icon>

                <div>
                  <Typography variant="h2" fontWeight="fontWeightBold">
                    {liveEvent.title}
                  </Typography>
                  <Typography variant="subtitle1" mt={2}>
                    Current event
                  </Typography>
                </div>
              </EventName>

              <Box fontSize="h2.fontSize" fontWeight="fontWeightMedium">{clock}</Box>
            </EventContainer>

            <Divider my={6}/>

            <ConnectionsContainer>
              <Box>
                <Box fontSize="h2.fontSize" fontWeight="fontWeightMedium">{totalConnections}</Box>
                <Typography variant="subtitle1" mt={2} color="textSecondary">
                  Total connections
                </Typography>
              </Box>
              <Box>
                <Box fontSize="h2.fontSize" fontWeight="fontWeightMedium">{tensConnected}</Box>
                <Typography variant="subtitle1" mt={2} color="textSecondary">
                  Number of tens connected
                </Typography>
              </Box>
              <Box>
                <Box fontSize="h2.fontSize" fontWeight="fontWeightMedium">{friendsFromTen}</Box>
                <Typography variant="subtitle1" mt={2} color="textSecondary">
                  Friends from your ten
                </Typography>
              </Box>
            </ConnectionsContainer>
          </>
          :
          <Typography variant="h3">No live event</Typography>
        }
      </CardContent>
    </Card>
  );
};

export default connect(store => ({profile: store.profileReducer}))(Arvut);
