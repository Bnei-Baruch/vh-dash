import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { DASHBOARD_ROOT, ROOT } from '../../routes/dashboardRoutes';

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
  const history = useHistory();

  const handleClick = (event, path) => {
    event.preventDefault();
    history.push(path);
  };

  return (
    <div>
      <Typography variant='h3'>{title}</Typography>
      {breadcrumbs.length ? (
        <Breadcrumbs aria-label='breadcrumb' className={classes.breadcrumbs}>
          <Link color={'inherit'} href={DASHBOARD_ROOT} onClick={event => handleClick(event, ROOT)}>
            Dashboard
          </Link>
          {breadcrumbs.map(item => (
            <Link
              key={item.name}
              color='textPrimary'
              href={item.path}
              onClick={event => handleClick(event, item.path)}
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
