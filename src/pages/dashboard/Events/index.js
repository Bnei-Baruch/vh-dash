import React from 'react';

import styled, {withTheme} from 'styled-components';
import {Helmet} from 'react-helmet/es/Helmet';
import {Breadcrumbs, Divider as MuiDivider, Grid, Typography as MuiTypography} from '@material-ui/core';
import {spacing} from '@material-ui/system';
import Arvut from './Arvut';
import Calendar from './Calendar';

const Typography = styled(MuiTypography)(spacing);
const Divider = styled(MuiDivider)(spacing);

const Events = () => {
  const now = new Date();
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
  return (
    <>
      <Helmet title="Events"/>
      <Typography variant="h3" gutterBottom display="inline">
        Welcome back
      </Typography>
      <Typography variant="body2" ml={2} display="inline">
        {`${dayNames[now.getDay()]}, ${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>Dashboard</Typography>
        <Typography>Events</Typography>
      </Breadcrumbs>

      <Divider my={6}/>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <Arvut/>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Calendar/>
        </Grid>
      </Grid>
    </>
  );
}

export default withTheme(Events);
