import React from 'react';
import styled from 'styled-components';

import Helmet from 'react-helmet';

import {Card as MuiCard, CardContent, Divider as MuiDivider, Grid, Typography} from '@material-ui/core';

import {spacing} from '@material-ui/system';

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Welcome = () => (
  <>
    <Helmet title="Welcome"/>
    <Typography variant="h3" gutterBottom display="inline">
      Welcome
    </Typography>

    <Divider my={6}/>

    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Empty card
            </Typography>
            <Typography variant="body2" gutterBottom>
              Empty card
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
);

export default Welcome;
