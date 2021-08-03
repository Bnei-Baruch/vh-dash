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
  first_name_vernacular: null,
  last_name_vernacular: null,
  date_of_birth: null,
  gender: null,
  marital_status: null,
  street_address: null,
  state_region: null,
  postal_code: null,
  country: null,
  city: null,
  primary_email: null,
  alternate_email_1: null,
  alternate_email_2: null,
  first_language: 'en',
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
  has_ten_group: null,
  wants_ten_group: null,
  name_of_ten_group: null,
};

const MyProfile = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profileData = useSelector(profileInfo);
  const { isModalOpen, description } = useSelector(profileModalContent);

  const [errorFields, setErrorFields] = useState({ ...initialErrorFields });
  const [updatedFields, setUpdatedFileds] = useState({});
  const [inputFields, setInputFields] = useState({
    ...initialFields,
    ...profileData,
    primaryLanguage: 'en'
  });

  const onErrorClear = () => setErrorFields(initialErrorFields);

  const handleChange = (field, value) => {
    setUpdatedFileds({
      ...updatedFields, [field]: value
    });
    setInputFields(prevState => ({ ...prevState, [field]: value }));
  }

  const onSubmit = () => {
    dispatch(updateProfile(updatedFields));
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
