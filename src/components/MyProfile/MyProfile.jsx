import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

import NavigationBar from '../NavigationBar';
import MyProfileTab from './Tabs/MyProfileTab';
import LanguagesTab from './Tabs/LanguagesTab';
import OtherInformationsTab from './Tabs/OtherInformationsTab';
import SecurityTab from './Tabs/SecurityTab';

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
  errorMsg: {
    position: 'absolute',
    top: 0,
  },
}));

const MyProfile = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const tabs = [
    {
      id: 0,
      tab: t('Dashboard.Profile.Tabs.personal'),
      component: <MyProfileTab />,
    },
    {
      id: 1,
      tab: t('Dashboard.Profile.Tabs.security'),
      component: <SecurityTab />,
    },
    {
      id: 2,
      tab: t('Dashboard.Profile.Tabs.languages'),
      component: <LanguagesTab />,
    },
    {
      id: 3,
      tab: t('Dashboard.Profile.Tabs.otherInformations'),
      component: <OtherInformationsTab />,
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
