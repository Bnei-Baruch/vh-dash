import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

import HLSPlayer from './HLSPlayer';
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
}));

const BroadcastArea = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Helmet title={t('Dashboard.BroadcastArea.name')} />

      <Grid container spacing={10}>
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
