import React from 'react';
import {
  Divider as MuiDivider,
  Grid,
  Typography as MuiTypography,
} from '@material-ui/core';
import styled from 'styled-components';
import { spacing } from '@material-ui/system';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { profileInfo } from '../../../redux/selectors/profile';

const Typography = styled(MuiTypography)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Header = () => {
  const { t } = useTranslation();
  const profileData = useSelector(profileInfo);
  const now = new Date();

  const MONTH_NAMES = [
    t('Global.Months.january'),
    t('Global.Months.february'),
    t('Global.Months.march'),
    t('Global.Months.april'),
    t('Global.Months.may'),
    t('Global.Months.june'),
    t('Global.Months.july'),
    t('Global.Months.august'),
    t('Global.Months.september'),
    t('Global.Months.october'),
    t('Global.Months.november'),
    t('Global.Months.december'),
  ];

  return (
    <>
      <Grid>
        <Typography variant='h3'>
          {t('Home.welcomeBack')}, {profileData ? profileData.first_name_vernacular : ''}
        </Typography>
        <Typography variant='body2' ml={2}>
          {`${now.getDate()} ${
            MONTH_NAMES[now.getMonth()]
          } ${now.getFullYear()}`}
        </Typography>
      </Grid>

      <Divider my={6} />
      <br/>
    </>
  );
};

export default Header;
