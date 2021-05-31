import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import { PAYMENT_URL } from '../../shared/constants';
import { EditDialog } from './EditDialog';

const useStyles = makeStyles({
  cardAction: {
    justifyContent: 'space-between',
    padding: 16,
  },
  divider: {
    margin: '0 16px',
  },
  currency: {
    fontSize: '6rem',
    paddingTop: 16,
    fontWeight: 100,
  },
});

const mockData = [
  {
    id: 1,
    name: 'Galaxy Plus',
    paymentDate: 'Last payment date',
    currency: 60,
    expirationDate: '09/11/21',
  },
  {
    id: 2,
    name: 'Simple',
    paymentDate: 'Last payment date',
    currency: 20,
    expirationDate: '01/01/21',
  },
];

const initialFields = {
  amount: '',
  currency: 'USD',
  subscription: 'active',
};

const MyPlan = () => {
  const classes = useStyles();
  const { t } = useTranslation();
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

  const [windowOpen, setWindowOpen] = useState(false);
  const [inputFields, setInputFields] = useState(initialFields);

  const onEdit = () => setWindowOpen(true);

  const handleClose = () => {
    setWindowOpen(false);
    setInputFields(initialFields);
  };

  const handleChange = (field, value) => {
    setInputFields(prevState => ({ ...prevState, [field]: value }));
  };

  const onSubmit = () => console.log('Submit plan');

  return mockData.length ? (
    <>
      <Grid container spacing={6}>
        {mockData.map(item => {
          const [month, date, year] = new Date(item.expirationDate)
            .toLocaleDateString('en-US')
            .split('/');

          return (
            <Grid key={item.id} item xs={12} md={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography gutterBottom variant='h4' component='h2'>
                    {item.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    {item.paymentDate}
                  </Typography>
                  <Typography
                    component='p'
                    className={classes.currency}
                    color='primary'
                  >
                    ${item.currency}
                  </Typography>
                </CardContent>
                <Divider className={classes.divider} />
                <CardActions className={classes.cardAction}>
                  <Box>
                    <Typography>{`${date} ${
                      MONTH_NAMES[month - 1]
                    }, ${year}`}</Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      {item.paymentDate}
                    </Typography>
                  </Box>
                  <Button
                    size='small'
                    color='primary'
                    variant='contained'
                    onClick={onEdit}
                  >
                    {t('Dashboard.Payments.edit')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <EditDialog
        open={windowOpen}
        onClose={handleClose}
        onSubmit={onSubmit}
        inputFields={inputFields}
        handleChange={handleChange}
      />
    </>
  ) : (
    <Button
      variant='contained'
      color='primary'
      href={PAYMENT_URL}
      target='_blank'
    >
      {t('Dashboard.Payments.newPlan')}
    </Button>
  );
};

export default MyPlan;
