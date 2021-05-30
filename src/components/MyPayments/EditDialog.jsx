import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  Button,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import SelectElement from '../Forms/FormElements/SelectElement';
import { currencyData, subscriptionData } from '../../constants/formData';
import { setStatusColor } from '../../shared/helper';

const CustomInput = withStyles(theme => ({
  input: {
    position: 'relative',
    color: '#FFF',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    '&.MuiSelect-select': {
      padding: '5px 15px',
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  dialogContent: {
    overflow: 'hidden',
  },
  icon: {
    display: 'none',
  },
  label: {
    marginLeft: 0,
  },
  dialogActions: {
    justifyContent: 'space-between',
    padding: 24,
    marginTop: '15%',
  },
  button: {
    width: '46%',
    height: 48,
  },
  input: {
    '& .MuiInputLabel-formControl': {
      fontSize: 18,
      position: 'relative',
      color: '#263238',
      '& + .MuiInput-formControl': {
        marginTop: 0,
      },
    },
  },
});

export const EditDialog = ({
  onClose,
  onSubmit,
  open,
  inputFields,
  handleChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { subscription, amount, currency } = inputFields;

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby='dialog-title'
      open={open}
      fullWidth
    >
      <DialogTitle id='dialog-title'>
        {t('Dashboard.Payments.editSubscription')}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={6} alignItems='flex-end'>
          <Grid item xs={12}>
            <FormControlLabel
              labelPlacement='start'
              label={t('Dashboard.Payments.subscriptionLabel')}
              className={classes.label}
              control={
                <Select
                  value={subscription}
                  onChange={event =>
                    handleChange('subscription', event.target.value)
                  }
                  classes={{ icon: classes.icon }}
                  input={
                    <CustomInput
                      style={{
                        backgroundColor: setStatusColor(subscription),
                        borderRadius: 15,
                        marginLeft: 20,
                      }}
                    />
                  }
                >
                  {subscriptionData.map(item => (
                    <MenuItem key={item.code} value={item.code}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='amount'
              type='number'
              label={t('Dashboard.Payments.amountLabel')}
              className={classes.input}
              value={amount}
              onChange={event => handleChange('amount', event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectElement
              id='currency'
              label={t('Dashboard.Payments.currencyLabel')}
              value={currency}
              onChange={handleChange}
              selectData={currencyData}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={onClose}
          color='primary'
          variant='outlined'
          className={classes.button}
        >
          {t('Global.cancelBtn')}
        </Button>
        <Button
          onClick={onSubmit}
          color='primary'
          variant='contained'
          className={classes.button}
        >
          {t('Global.saveBtn')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputFields: PropTypes.object.isRequired,
};
