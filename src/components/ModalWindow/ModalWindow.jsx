import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useTranslation } from 'react-i18next';

const ModalWindow = ({ open, handleClose }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby='dialog-description'
    >
      <DialogContent>
        <DialogContentText id='dialog-description'>
          {t('UserMenu.logOutText')}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button
          onClick={handleClose}
          color='primary'
          autoFocus
          variant='contained'
        >
          {t('UserMenu.yesBtn')}
        </Button>
        <Button onClick={handleClose} variant='contained'>
          {t('UserMenu.cancelBtn')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalWindow.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalWindow;
