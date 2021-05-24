import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

import HLSPlayer from '../HLSPlayer';
import BroadcastQuestions from './BroadcastQuestions';
import Annoucements from './Annoucements';

const useStyles = makeStyles(theme => ({
  rightButton: {
    borderRight: `2px  solid ${theme.palette.text.secondary}`,
    '@media (max-width: 600px)': {
      borderRight: 'none',
      borderBottom: `2px  solid ${theme.palette.text.secondary}`,
    },
  },
  upper: {
    textTransform: 'uppercase',
    '@media (max-width: 600px)': {
      fontSize: '1.25rem',
    },
  },
}));

const BroadcastArea = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Helmet title={t('Dashboard.BroadcastArea.name')} />

      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Box ml={4}>
              <Typography
                variant='h1'
                className={classes.upper}
                style={{ color: '#ff6f28' }}
              >
                {t('Dashboard.BroadcastArea.caption')}
              </Typography>
              <Typography variant='h2' className={classes.upper}>
                {t('Dashboard.BroadcastArea.subCaption')}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.rightButton}>
          <HLSPlayer />
          <BroadcastQuestions />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Annoucements />
        </Grid>
      </Grid>
    </>
  );
};

export default BroadcastArea;
