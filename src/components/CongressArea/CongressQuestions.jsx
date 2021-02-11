import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Button, TextareaAutosize, Typography } from '@material-ui/core';
import validator from '../../helpers/validator';

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

const CongressQuestions = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const state = useSelector(state => state.userReducer.info.profile);
  const [question, setQuestion] = useState('');
  const [errorField, setErrorField] = useState({ question: [] });

  const sendQuestion = event => {
    event.preventDefault();
    const { username, gender } = state;
    const { fieldsetHasErrors, fieldsetHasValues } = validator;

    console.log('Send question', {
      askForMe: true,
      question: {
        content: question,
      },
      user: {
        user: username,
        gender,
        galaxyRoom: 'Congress Area',
      },
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        askForMe: true,
        question: {
          content: question,
        },
        user: {
          user: username,
          gender,
          galaxyRoom: 'Congress Area',
        },
      }),
    };

    // Check a validation error
    onQuestionBlur();
    
    if (!fieldsetHasErrors(errorField) && fieldsetHasValues(question)) {
      fetch('/api/ask', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
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
        {t('Dashboard.CongressArea.Question.title')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={8}>
          <form noValidate autoComplete='off'>
            <Typography
              variant='h6'
              component='p'
              color='textSecondary'
              gutterBottom
              style={{ fontSize: '1rem', marginTop: '10px' }}
            >
              {t('Dashboard.CongressArea.Question.label')}
            </Typography>
            <TextareaAutosize
              className={`${classes.textArea} ${
                errorField.question.length ? 'error' : ''
              }`}
              rowsMin={4}
              value={question}
              placeholder={t('Dashboard.CongressArea.Question.placeholder')}
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
                {t('Dashboard.CongressArea.Question.button')}
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CongressQuestions;
