import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
});

const Annoucements = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Typography variant='h3' gutterBottom>
        {t('Dashboard.CongressArea.Annoucements.title')}
      </Typography>
      <Box>{t('Dashboard.CongressArea.Annoucements.text')}</Box>
    </div>
  );
};

export default Annoucements;
