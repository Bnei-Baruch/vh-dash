import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { DASHBOARD_ROOT } from '../../routes/dashboardRoutes';

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    marginBottom: theme.spacing(6),
    '& .MuiTypography-colorInherit': {
      color: '#1E88E5',
    },
  },
}));

const DashboardHeader = ({ title, breadcrumbs }) => {
  const classes = useStyles();

  const handleClick = event => event.preventDefault();

  return (
    <div>
      <Typography variant='h3'>{title}</Typography>
      {breadcrumbs.length ? (
        <Breadcrumbs aria-label='breadcrumb' className={classes.breadcrumbs}>
          <Link color={'inherit'} href={DASHBOARD_ROOT} onClick={handleClick}>
            Dashboard
          </Link>
          {breadcrumbs.map(item => (
            <Link
              key={item.name}
              color='textPrimary'
              href={item.path}
              onClick={handleClick}
              aria-current='page'
            >
              {item.name}
            </Link>
          ))}
        </Breadcrumbs>
      ) : null}
    </div>
  );
};

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DashboardHeader;
