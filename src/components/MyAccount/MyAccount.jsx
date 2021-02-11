import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

import NavigationBar from '../NavigationBar';
import TransactionTable from './TransactionTable';
import PaymentMethodsTable from './PaymentMethodsTable';

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

const MyAccount = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const tabs = [
    {
      id: 0,
      tab: t('Dashboard.Account.Tabs.transaction'),
      component: <TransactionTable />,
    },
    {
      id: 1,
      tab: t('Dashboard.Account.Tabs.payment'),
      component: <PaymentMethodsTable />,
    },
  ];

  return (
    <div className={classes.root}>
      <Helmet title={t('Dashboard.Account.name')} />
      <NavigationBar tabs={tabs} />
    </div>
  );
};

export default MyAccount;
