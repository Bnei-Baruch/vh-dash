import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Button, TextareaAutosize, Typography } from '@material-ui/core';
import validator from '../../helpers/validator';
import { QUESTION_URL } from '../../shared/constants';
import Notifications from '../ui/Notifications';

const useStyles = makeStyles(theme => ({
  textArea: {
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: 6,
    border: `2px solid ${theme.palette.text.secondary}`,
    outline: 'none',
    '&.error': {
      borderColor: theme.palette.error.main,
    },
  },
}));

const BroadcastQuestions = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const state = useSelector(state => state.userReducer.info);
  const [errorField, setErrorField] = useState({ question: [] });
  const [question, setQuestion] = useState('');
  const [open, setOpen] = useState(false);
  const [isSentSuccessfully, setIsSentSuccessfully] = useState(true);

  const sendQuestion = event => {
    event.preventDefault();

    const { username, lastName, firstName, gender } = state.profile;
    const { fieldsetHasErrors, fieldsetHasValues } = validator;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify({
        askForMe: true,
        serialUserId: username,
        question: {
          content: question,
        },
        user: {
          gender,
          name: `${firstName} ${lastName}`,
          galaxyRoom: 'Broadcast Area',
        },
      }),
    };

    // Check validation error
    onQuestionBlur();

    if (!fieldsetHasErrors(errorField) && fieldsetHasValues(question)) {
      fetch(`${QUESTION_URL}/api/ask`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Question response', data);
          setOpen(true);
          
          if (data.msg) {
            setIsSentSuccessfully(false);
            return;
          }
          setIsSentSuccessfully(true);
        })
        .finally(setQuestion(''));
    }
  };

  const onChangeQuestion = event => {
    setQuestion(event.target.value);
    setErrorField({ question: [] });
  };

  const onQuestionBlur = () => {
    validator.extendErrorFields(
      errorField,
      'question',
      validator.fieldTypes['question'],
      question,
    );

    setErrorField({ ...errorField });
  };

  return (
    <Box mt={10}>
      <Typography variant='h5' gutterBottom>
        {t('Dashboard.BroadcastArea.Question.title')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <form noValidate autoComplete='off'>
            <Typography
              variant='h6'
              component='p'
              color='textSecondary'
              gutterBottom
              style={{ fontSize: '1rem', marginTop: '10px' }}
            >
              {t('Dashboard.BroadcastArea.Question.label')}
            </Typography>
            <TextareaAutosize
              className={`${classes.textArea} ${
                errorField.question.length ? 'error' : ''
              }`}
              rowsMin={4}
              value={question}
              placeholder={t('Dashboard.BroadcastArea.Question.placeholder')}
              onChange={onChangeQuestion}
              onBlur={onQuestionBlur}
            />
            {errorField.question.length ? (
              <Typography
                variant='h6'
                component='p'
                color='error'
                gutterBottom
                style={{ fontSize: '0.75rem' }}
              >
                {errorField.question}
              </Typography>
            ) : null}
            <Box display='flex' justifyContent='flex-end'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={sendQuestion}
              >
                {t('Dashboard.BroadcastArea.Question.button')}
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
      <Notifications
        open={open}
        toggleNotifications={setOpen}
        isSentSuccessfully={isSentSuccessfully}
      />
    </Box>
  );
};

export default BroadcastQuestions;
