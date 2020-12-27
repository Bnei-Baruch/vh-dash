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
import {ARVUT_URL} from '../../../shared/constants';
import {spacing} from '@material-ui/system';
import styled from 'styled-components';
import {Mic} from 'react-feather';

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
`;

const ConnectionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


const Arvut = ({liveEvent}) => {
  const [clock, setClock] = useState('');

  useEffect(() => {
    let interval;

    if (liveEvent) {
      interval = setInterval(() => {
        const now = new Date();
        setClock(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
      }, 1000);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [liveEvent]);

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
                  <Typography variant="h2">
                    <Box fontWeight="fontWeightBold">{liveEvent.title}</Box>
                  </Typography>
                  <Typography variant="subtitle1" mt={2}>
                    Current event
                  </Typography>
                </div>
              </EventName>

              <Typography variant="h2">{clock}</Typography>
            </EventContainer>

            <Divider my={6}/>

            <ConnectionsContainer>
              <div>
                <Typography variant="h2">
                  <Box fontWeight="fontWeightBold">4000</Box>
                </Typography>
                <Typography variant="subtitle1" mt={2} color="textSecondary">
                  Total connections
                </Typography>
              </div>
              <div>
                <Typography variant="h2">
                  <Box fontWeight="fontWeightBold">300</Box>
                </Typography>
                <Typography variant="subtitle1" mt={2} color="textSecondary">
                  Number of tens connected
                </Typography>
              </div>
              <div>
                <Typography variant="h2">
                  <Box fontWeight="fontWeightBold">8</Box>
                </Typography>
                <Typography variant="subtitle1" mt={2} color="textSecondary">
                  Friends from your ten
                </Typography>
              </div>
            </ConnectionsContainer>
          </>
          :
          <Typography variant="h3">No live event</Typography>
        }
      </CardContent>
    </Card>
  );
};

export default Arvut;
