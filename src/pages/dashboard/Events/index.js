import React from 'react';

import styled, {withTheme} from 'styled-components';
import {Helmet} from 'react-helmet/es/Helmet';
import {Divider as MuiDivider, Grid, Typography as MuiTypography} from '@material-ui/core';
import {spacing} from '@material-ui/system';
import Arvut from './Arvut';
import Calendar from './Calendar';

const Typography = styled(MuiTypography)(spacing);
const Divider = styled(MuiDivider)(spacing);

const Events = () => {
  return (
    <>
      <Helmet title="Events"/>
      <Typography variant="h3" gutterBottom display="inline">
        Welcome back
      </Typography>
      <Typography variant="body2" ml={2} display="inline">
        {`${new Date().toDateString()}`}
      </Typography>

      <Divider my={6}/>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <Arvut />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Calendar />
        </Grid>
      </Grid>
    </>
  );
}

export default withTheme(Events);
