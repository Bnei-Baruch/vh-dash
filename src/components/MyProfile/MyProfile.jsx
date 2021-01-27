import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import NavigationBar from '../NavigationBar';
import { Grid } from '@material-ui/core';
import PersonalForm from '../Forms/PersonalForm';
import LoginForm from '../Forms/LoginForm';
import SocialContainer from '../SocialContainer';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F2F2F2',
  },
  breadcrumbs: {
    marginBottom: theme.spacing(6),
    '& .MuiTypography-colorInherit': {
      color: '#1E88E5',
    },
  },
}));

const MyProfileContent = () => (
  <Grid container spacing={6}>
    <Grid item xs={12} sm={6}>
      <PersonalForm />
    </Grid>
    <Grid item xs={12} sm={6}>
      <LoginForm />
    </Grid>
    <Grid item xs={12}>
      <SocialContainer />
    </Grid>
  </Grid>
);

const MyProfile = () => {
  const classes = useStyles();
  const tabs = [
    {
      id: 0,
      tab: 'Personal',
      component: <MyProfileContent />,
    },
    {
      id: 1,
      tab: 'My Framework',
      component: 'Item Two',
    },
    {
      id: 2,
      tab: 'My Ten',
      component: 'Item Three',
    },
    {
      id: 3,
      tab: 'My Skills',
      component: 'Item Four',
    },
    {
      id: 4,
      tab: 'Notification',
      component: 'Item Five',
    },
  ];

  return (
    <div className={classes.root}>
      <NavigationBar tabs={tabs} />
    </div>
  );
};

export default MyProfile;
