import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
  const tabs = [
    {
      id: 0,
      tab: 'All Transaction',
      component: <TransactionTable />,
    },
    {
      id: 1,
      tab: 'Payments',
      component: <PaymentMethodsTable />,
    },
  ];

  return (
    <div className={classes.root}>
      <NavigationBar tabs={tabs} />
    </div>
  );
};

export default MyAccount;
