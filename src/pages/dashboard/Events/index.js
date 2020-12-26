import React, {createRef, useRef, useState} from 'react';
import styled, {withTheme} from 'styled-components';
import {Helmet} from 'react-helmet/es/Helmet';
import {Button, Divider as MuiDivider, Grid, IconButton, Typography as MuiTypography} from '@material-ui/core';
import {RefreshCw} from 'react-feather';
import {spacing} from '@material-ui/system';
import Arvut from './Arvut';
import Calendar from './Calendar';
import {DAY_NAMES, MONTH_NAMES} from '../../../shared/constants';

const Typography = styled(MuiTypography)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Events = () => {
  const now = new Date();

  const [liveEvent, setLiveEvent] = useState();
  const calendarRef = createRef();

  return (
    <>
      <Helmet title="Events"/>

      <Grid>
        <Typography variant="h3" display="inline">
          Welcome back, Lucy
        </Typography>
        <Typography variant="body2" ml={2} display="inline">
          {`${DAY_NAMES[now.getDay()]}, ${now.getDate()} ${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`}
        </Typography>
      </Grid>

      {/*<Breadcrumbs aria-label="Breadcrumb" mt={2}>*/}
      {/*  <Typography>Dashboard</Typography>*/}
      {/*  <Typography>Events</Typography>*/}
      {/*</Breadcrumbs>*/}

      <Divider my={6}/>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <Arvut liveEvent={liveEvent}/>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Calendar onLiveEvent={(event) => setLiveEvent(event)}/>
        </Grid>
      </Grid>
    </>
  );
}

export default withTheme(Events);
