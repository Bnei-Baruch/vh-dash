import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

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
  const { t } = useTranslation();
  const tabs = [
    {
      id: 0,
      tab: t('Dashboard.Profile.Tabs.personal'),
      component: <MyProfileContent />,
    },
  ];

  return (
    <div className={classes.root}>
      <Helmet title={t('Dashboard.Profile.name')} />
      <NavigationBar tabs={tabs} />
    </div>
  );
};

export default MyProfile;
