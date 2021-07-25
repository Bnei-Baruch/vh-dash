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
    marginTop: '15px',
    fontWeight: 700,
  },
  donationsQuote: {
    textAlign: 'left',
    marginTop: '10px',
    marginBotton: '15px',
    fontStyle: 'italic',
  }
});

const Annoucements = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div >
      <Typography className={classes.title} variant='h3' gutterBottom>
        {t('Dashboard.BroadcastArea.Annoucements.title')}
      </Typography>
      <Box>{t('Dashboard.BroadcastArea.Annoucements.text')}</Box>
      <Box className={classes.donations}>{t('Dashboard.BroadcastArea.Annoucements.donations')}</Box>
      <Box className={classes.donationsQuote}>{t('Dashboard.BroadcastArea.Annoucements.donationsQuote')}</Box>
      <a target="_blank" rel="noopener noreferrer" href={t('Dashboard.BroadcastArea.Annoucements.donationsLink')}>
        <Button variant="contained" color="primary">
          {t('Dashboard.BroadcastArea.Annoucements.donationsButton')} 
        </Button>
      </a>
    </div>
  );
};

export default Annoucements;
