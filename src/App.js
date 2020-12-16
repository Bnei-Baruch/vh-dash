import React from 'react';
import {connect} from 'react-redux';

import Helmet from 'react-helmet';

import DateFnsUtils from '@date-io/date-fns';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {StylesProvider} from '@material-ui/styles';
import {ThemeProvider} from 'styled-components';

import maTheme from './theme';
import Routes from './routes/Routes';

const App = ({theme}) =>
  <>
    <Helmet
      titleTemplate="%s | Our Virtual Home"
      defaultTitle="Our Virtual Home"
    />
    <StylesProvider injectFirst>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={maTheme[theme.currentTheme]}>
          <ThemeProvider theme={maTheme[theme.currentTheme]}>
            <Routes/>
          </ThemeProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </StylesProvider>
  </>;

export default connect((store) => ({theme: store.themeReducer}))(App);
