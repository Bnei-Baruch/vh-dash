import React, {useCallback, useState} from 'react';
import {withTheme} from 'styled-components';
import {Grid} from '@material-ui/core';
import Arvut from './Arvut';
import Calendar from './Calendar';
import Header from '../components/Header';

const Events = () => {
  const [liveEvent, setLiveEvent] = useState();

  const onLiveEvent = useCallback((event) => {
    setLiveEvent(event)
  }, []);

  return (
    <>
      <Header/>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <Arvut liveEvent={liveEvent}/>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Calendar onLiveEvent={onLiveEvent}/>
        </Grid>
      </Grid>
    </>
  );
}

export default withTheme(Events);
