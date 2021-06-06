import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import NavigationBar from '../NavigationBar';
import MyProfileTab from './Tabs/MyProfileTab';
import LanguagesTab from './Tabs/LanguagesTab';
import OtherInformationsTab from './Tabs/OtherInformationsTab';
import SecurityTab from './Tabs/SecurityTab';
import { PROFILE_URL } from '../../shared/constants';
import ModalWindow from '../ui/ModalWindow';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F2F2F2',
  },
  breadcrumbs: {
    marginBottom: theme.spacing(6),
    '& .MuiTypography-colorInherit': {
      color: '#1E88E5',
    },
  },
}));

// main.profileRequest = {
//   KeycloakID: (*string)(0xc00038d970),
//   FirstNameLatin: (*string)(nil),
//   FirstNameVernacular: (*string)(nil),
//   LastNameLatin: (*string)(nil),
//   LastNameVernacular: (*string)(nil),
//   StreetAddress: (*string)(0xc00038d980),
//   Country: (*string)(0xc00038d990),
//   StateOrRegion: (*string)(0xc00038d9a0),
//   PostalCode: (*string)(0xc00038d9b0),
//   City: (*string)(0xc00038d9c0),
//   Gender: (*string)(0xc00038d9d0),
//   MaritalStatus:(*string)(0xc00038d9e0),
//   DateOfBirth: (*time.Time)(nil),
//   PrimaryEmail: (*string)(nil),
//   AlternateEmail1: (*string)(0xc00038d9f0),
//   AlternateEmail2: (*string)(0xc00038da00),
//   MobileNumber: (*string)(0xc00038da10),
//   WhatsAppNumber: (*string)(0xc00038da20),
//   TelegramNumber: (*string)(0xc00038da30),
//   FirstLanguage: (*string)(0xc00038da40),
//   OtherLanguage1:(*string)(0xc00038da50),
//   OtherLanguage2: (*string)(0xc00038da60),
//   OtherLanguage3: (*string)(0xc00038da70),
//   OtherLanguage4: (*string)(0xc00038da80),
//   ListeningLanguage: (*string)(0xc00038da90),
//   ReadingLanguage: (*string)(0xc00038daa0),
//   EmailLanguage: (*string)(0xc00038dab0),
//   StudyStartYear: (*int)(0xc000391a80),
//   StudyFramework: (*string)(0xc00038dac0),
//   HasGroup: (*bool)(0xc000391a8c),
//   WantsGroup: (*bool)(0xc000391a8d),
//   NameOfGroup: (*string)(nil)
// }

const initialErrorFields = {
  primaryEmail: '',
  alternativeEmail1: '',
  alternativeEmail2: '',
};

const initialFields = {
  firstname: null,
  dob: null,
  gender: null,
  lastname: null,
  maritalStatus: null,
  streetAddress: null,
  postalCode: null,
  stateRegion: null,
  country: null,
  city: null,
  primaryEmail: null,
  alternativeEmail1: null,
  alternativeEmail2: null,
  phone: null,
  telegramPhone: null,
  whatsappPhone: null,
  firstLanguage: 'English',
  language1: null,
  language2: null,
  language3: null,
  language4: null,
  emailLanguage: null,
  listeningLanguage: null,
  readingLanguage: null,
  startYear: null,
  studyFramework: null,
  isStudyGroup: 'Yes',
  isWantStudyGroup: 'No',
  tenName: null,
};

const MyProfile = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { keycloak } = useSelector(state => state.userReducer.info);

  const [isProfileExist, setIsProfileExist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentText, setContentText] = useState('');
  const [errorFields, setErrorFields] = useState({ ...initialErrorFields });
  const [inputFields, setInputFields] = useState({
    ...initialFields,
    firstname: keycloak.profile.firstName,
    lastname: keycloak.profile.lastName,
    country: 'Germany',
    primaryLanguage: 'English',
    gender: 'male',
    maritalStatus: 'Single',
    primaryEmail: keycloak.profile.email,
    firstLanguage: 'English',
  });

  const onErrorClear = () => setErrorFields(initialErrorFields);

  const handleChange = (field, value) =>
    setInputFields(prevState => ({ ...prevState, [field]: value }));

  const getProfile = async () => {
    try {
      const response = await axios.get(`${PROFILE_URL}/${keycloak.subject}`, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });

      setIsProfileExist(true);
      console.log('Success response:', response);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        onSubmit();
      }

      console.error('Failed response:', error);
    }
  };

  const sendProfile = (method, url, data) => {
    return axios[method](url, data, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    });
  };

  const convertToBoolean = value => (value === 'Yes' ? true : false);

  const onSubmit = () => {
    const {
      firstname,
      dob,
      gender,
      lastname,
      maritalStatus,
      streetAddress,
      postalCode,
      stateRegion,
      country,
      primaryEmail,
      alternativeEmail1,
      alternativeEmail2,
      phone,
      telegramPhone,
      whatsappPhone,
      firstLanguage,
      language1,
      language2,
      language3,
      language4,
      emailLanguage,
      listeningLanguage,
      readingLanguage,
      startYear,
      studyFramework,
      isStudyGroup,
      isWantStudyGroup,
      tenName,
      city,
    } = inputFields;

    const data = {
      keycloak_id: keycloak.subject,
      first_name_latin: firstname,
      first_name_vernacular: firstname,
      last_name_latin: lastname,
      last_name_vernacular: lastname,
      street_address: streetAddress,
      country,
      state_region: stateRegion,
      postal_code: postalCode,
      city,
      gender,
      marital_status: maritalStatus,
      date_of_birth: dob,
      primary_email: primaryEmail,
      alternate_email_1: alternativeEmail1,
      alternate_email_2: alternativeEmail2,
      mobile_number: phone,
      whats_app_number: whatsappPhone,
      telegram_number: telegramPhone,
      first_language: firstLanguage,
      other_language_1: language1,
      other_language_2: language2,
      other_language_3: language3,
      other_language_4: language4,
      listening_language: listeningLanguage,
      reading_language: readingLanguage,
      email_language: emailLanguage,
      study_start_year: startYear ? new Date(startYear).getFullYear() : null,
      study_framework: studyFramework,
      has_ten_group: convertToBoolean(isStudyGroup),
      wants_ten_group: convertToBoolean(isWantStudyGroup),
      name_of_ten_group: tenName,
    };

    const patchURL = `${PROFILE_URL}/${keycloak.subject}`;

    isProfileExist
      ? sendProfile('patch', patchURL, data)
          .then(res => {
            setContentText(t('Dashboard.Profile.updatedProfile'));
            console.log('Success patch response:', res);
          })
          .catch(error => {
            console.error('Failed patch response:', error);
            setContentText(t('Global.requestError'));
          })
          .finally(() => setIsModalOpen(true))
      : sendProfile('post', PROFILE_URL, data)
          .then(res => {
            setContentText(t('Dashboard.Profile.createdProfile'));
            console.log('Success post response:', res);
          })
          .catch(error => {
            setContentText(t('Global.requestError'));
            console.error('Failed post response:', error);
          })
          .finally(() => setIsModalOpen(true));
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

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
      tab: t('Dashboard.Profile.Tabs.security'),
      component: (
        <SecurityTab
          inputFields={inputFields}
          setInputFields={setInputFields}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      ),
    },
    {
      id: 2,
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
      id: 3,
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
        contentText={contentText}
        closeBtnText={t('Global.closeBtn')}
        handleClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MyProfile;
