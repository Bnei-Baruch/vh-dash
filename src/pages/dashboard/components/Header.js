import React from 'react';
import Helmet from 'react-helmet';
import {Divider as MuiDivider, Grid, Typography as MuiTypography} from '@material-ui/core';
import {DAY_NAMES, MONTH_NAMES} from '../../../shared/constants';
import styled from 'styled-components';
import {spacing} from '@material-ui/system';
import {connect} from 'react-redux';

const Typography = styled(MuiTypography)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Header = ({profile}) => {
  const now = new Date();

  return (
    <>
      <Helmet title="Events"/>

      <Grid>
        <Typography variant="h3" display="inline">
          Welcome back, {profile.name}
        </Typography>
        <Typography variant="body2" ml={2} display="inline">
          {`${DAY_NAMES[now.getDay()]}, ${now.getDate()} ${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`}
        </Typography>
      </Grid>

      <Divider my={6}/>
    </>
  )
};

export default connect(store => ({profile: store.profileReducer}))(Header);
