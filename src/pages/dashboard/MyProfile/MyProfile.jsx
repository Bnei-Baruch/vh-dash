import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import NavigationBar from './NavigationBar';
import MyProfileTab from './Tabs/MyProfileTab';
import LanguagesTab from './Tabs/LanguagesTab';
import OtherInformationsTab from './Tabs/OtherInformationsTab';
import ModalWindow from './ui/ModalWindow';
import { profileInfo, profileModalContent } from '../../../redux/selectors/profile';
import { convertBooleanToString } from '../../../shared/helper';
import { updateProfile } from '../../../redux/actions/profileActions';
import { TOGGLE_PROFILE_WINDOW } from '../../../redux/constants';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F2F2F2',
    paddingBottom: 76,
  },
  breadcrumbs: {
    marginBottom: theme.spacing(6),
    '& .MuiTypography-colorInherit': {
      color: '#1E88E5',
    },
  },
}));

const initialErrorFields = {
  primary_email: '',
  alternate_email_1: '',
  alternate_email_2: '',
};

const initialFields = {
  first_name_latin: null,
  last_name_latin: null,
  date_of_birth: null,
  gender: 'male',
  marital_status: 'Single',
  street_address: null,
  state_region: null,
  postal_code: null,
  country: 'Germany',
  city: null,
  primary_email: null,
  alternate_email_1: null,
  alternate_email_2: null,
  first_language: 'English',
  other_language_1: null,
  other_language_2: null,
  other_language_3: null,
  other_language_4: null,
  listening_language: null,
  reading_language: null,
  email_language: null,
  mobile_number: null,
  whats_app_number: null,
  telegram_number: null,
  study_start_year: null,
  study_framework: null,
  has_ten_group: 'Yes',
  wants_ten_group: 'No',
  name_of_ten_group: null,
};

const MyProfile = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { keycloak } = useSelector(state => state.userReducer.info);
  const profileData = useSelector(profileInfo);
  const { isModalOpen, description } = useSelector(profileModalContent);


  const [errorFields, setErrorFields] = useState({ ...initialErrorFields });
  const [inputFields, setInputFields] = useState({
    ...initialFields,
    ...profileData,
    primaryLanguage: 'English',
    first_name_latin: keycloak.profile.firstName,
    last_name_latin: keycloak.profile.lastName,
    primary_email: keycloak.profile.email,
    has_ten_group: convertBooleanToString(profileData.has_ten_group),
    wants_ten_group: convertBooleanToString(profileData.wants_ten_group),
  });

  const onErrorClear = () => setErrorFields(initialErrorFields);

  const handleChange = (field, value) =>
    setInputFields(prevState => ({ ...prevState, [field]: value }));

  const convertToBoolean = value => (value === 'Yes' ? true : false);

  const onSubmit = () => {
    const { has_ten_group, wants_ten_group, study_start_year } = inputFields;

    const data = {
      ...inputFields,
      keycloak_id: keycloak.subject,
      has_ten_group: convertToBoolean(has_ten_group),
      wants_ten_group: convertToBoolean(wants_ten_group),
      study_start_year: study_start_year
        ? new Date(study_start_year).getFullYear()
        : null,
    };

    dispatch(updateProfile(data));
  };

  const onModalClose = () =>
    dispatch({ type: TOGGLE_PROFILE_WINDOW, payload: false });

  const tabs = [
    {
      id: 0,
      tab: t('Dashboard.Profile.Tabs.personal'),
      component: (
        <MyProfileTab
          errorFields={errorFields}
          inputFields={inputFields}
          setErrorFields={setErrorFields}
          onErrorClear={onErrorClear}
          onSubmit={onSubmit}
          setInputFields={setInputFields}
          handleChange={handleChange}
        />
      ),
    },
    {
      id: 1,
      tab: t('Dashboard.Profile.Tabs.languages'),
      component: (
        <LanguagesTab
          inputFields={inputFields}
          setInputFields={setInputFields}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      ),
    },
    {
      id: 2,
      tab: t('Dashboard.Profile.Tabs.otherInformations'),
      component: (
        <OtherInformationsTab
          inputFields={inputFields}
          setInputFields={setInputFields}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      ),
    },
  ];

  return (
    <div className={classes.root}>
      <Helmet title={t('Dashboard.Profile.name')} />
      <NavigationBar tabs={tabs} />
      <ModalWindow
        open={isModalOpen}
        contentText={description}
        closeBtnText={t('Global.closeBtn')}
        handleClose={onModalClose}
      />
    </div>
  );
};

export default MyProfile;
