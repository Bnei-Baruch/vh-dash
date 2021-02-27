import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
  annoucements: {
    textAlign: 'left',
  },
  donations: {
    textAlign: 'left',
    marginTop: '10px',
  },
  donationsQuote: {
    textAlign: 'left',
    marginTop: '10px',
    marginBotton: '10px',
    fontStyle: 'italic',
  }
});

const Annoucements = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div >
      <Typography className={classes.title} variant='h3' gutterBottom>
        {t('Dashboard.CongressArea.Annoucements.title')}
      </Typography>
      <Box>{t('Dashboard.CongressArea.Annoucements.text')}</Box>
      <Box className={classes.donations}>{t('Dashboard.CongressArea.Annoucements.donations')}</Box>
      <Box className={classes.donations}>{t('Dashboard.CongressArea.Annoucements.donationsquote')}</Box>
      <a href={t('Dashboard.CongressArea.Annoucements.donationslink')}>
        <Button variant="contained" color="primary">
          {t('Dashboard.CongressArea.Annoucements.donationsbuttone')} 
        </Button>
      </a>
    </div>
  );
};

export default Annoucements;
