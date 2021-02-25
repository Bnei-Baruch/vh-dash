import React from 'react';
import {
  Divider as MuiDivider,
  Grid,
  Typography as MuiTypography,
} from '@material-ui/core';
import { DAY_NAMES, MONTH_NAMES } from '../../../shared/constants';
import styled from 'styled-components';
import { spacing } from '@material-ui/system';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Typography = styled(MuiTypography)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Header = () => {
  const { t } = useTranslation();
  const user = useSelector(state => state.userReducer.info.profile);
  const now = new Date();

  return (
    <>
      <Grid>
        <Typography variant='h3' display='inline'>
          {t('Home.welcomeBack')}, {user.firstName}
        </Typography>
        <Typography variant='body2' ml={2} display='inline'>
          {`${DAY_NAMES[now.getDay()]}, ${now.getDate()} ${
            MONTH_NAMES[now.getMonth()]
          } ${now.getFullYear()}`}
        </Typography>
      </Grid>

      <Divider my={6} />
    </>
  );
};

export default Header;
