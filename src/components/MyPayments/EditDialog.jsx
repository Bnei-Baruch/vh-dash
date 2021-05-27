import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import SelectElement from '../Forms/FormElements/SelectElement';
import { currencyData } from '../../constants/formData';

export const EditDialog = ({ onClose, onSubmit, open }) => {
  const { t } = useTranslation();

  const onChangeCurrency = () => console.log('onChange');

  return (
    <Dialog onClose={onClose} aria-labelledby='dialog-title' open={open}>
      <DialogTitle id='dialog-title'>
        {t('Dashboard.Payments.editSubscription')}
      </DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
          />
        </Box>
        <Box>
          <SelectElement
            id='currency'
            label={t('Dashboard.Payments.currencyLabel')}
            value='USD'
            onChange={onChangeCurrency}
            selectData={currencyData}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          {t('Global.cancelBtn')}
        </Button>
        <Button onClick={onSubmit} color='primary' variant='contained'>
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
};
