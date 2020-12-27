import React from 'react';
import Helmet from 'react-helmet';
import {Divider as MuiDivider, Grid, Typography as MuiTypography} from '@material-ui/core';
import {DAY_NAMES, MONTH_NAMES} from '../../../shared/constants';
import styled from 'styled-components';
import {spacing} from '@material-ui/system';

const Typography = styled(MuiTypography)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Header = () => {
  const now = new Date();

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

      <Divider my={6}/>
    </>
  )
};

export default Header;
