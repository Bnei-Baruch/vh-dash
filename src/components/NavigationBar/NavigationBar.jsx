import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid } from '@material-ui/core';
import TabPanel from './TabPanel.jsx';
import SocialContainer from '../../components/SocialContainer';
import PersonalForm from '../Forms/PersonalForm';
import LoginForm from '../Forms/LoginForm';

const a11yProps = (index, classes) => ({
  id: `scrollable-auto-tab-${index}`,
  'aria-controls': `scrollable-auto-tabpanel-${index}`,
  classes: { selected: `${classes}` },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#F2F2F2',
    '& .MuiTab-root': {
      '@media (min-width: 600px) and (max-width: 1100px)': {
        minWidth: '100px',
      },
    },
  },
  selectedTab: {
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    margin: theme.spacing(0, -3),
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
        >
          <Tab label='Personal' {...a11yProps(0, classes.selectedTab)} />
          <Tab label='My Framework' {...a11yProps(1, classes.selectedTab)} />
          <Tab label='My Ten' {...a11yProps(2, classes.selectedTab)} />
          <Tab label='My Skills' {...a11yProps(3, classes.selectedTab)} />
          <Tab label='Notification' {...a11yProps(4, classes.selectedTab)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <PersonalForm />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LoginForm />
          </Grid>
          <Grid item xs={12}>
            <SocialContainer />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabPanel}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.tabPanel}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.tabPanel}>
        Item Five
      </TabPanel>
    </div>
  );
};

export default NavigationBar;
