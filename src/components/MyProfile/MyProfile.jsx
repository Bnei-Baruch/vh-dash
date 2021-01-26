import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavigationBar from '../NavigationBar';

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

const MyProfile = () => {
  const classes = useStyles();
  const profile = useSelector(state => state.profileReducer);
  console.log('Contact Info', profile);

  const handleClick = event => event.preventDefault();

  return (
    <div className={classes.root}>
      <Typography variant='h3'>My profile</Typography>
      <Breadcrumbs aria-label='breadcrumb' className={classes.breadcrumbs}>
        <Link color='inherit' href='/' onClick={handleClick}>
          Dashboard
        </Link>
        <Link
          color='textPrimary'
          href='/'
          onClick={handleClick}
          aria-current='page'
        >
          Profile
        </Link>
      </Breadcrumbs>
      <NavigationBar />
    </div>
  );
};

export default MyProfile;
