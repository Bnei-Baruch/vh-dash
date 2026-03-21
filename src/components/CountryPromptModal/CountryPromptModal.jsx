import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SelectElement from '../../pages/dashboard/MyProfile/Forms/FormElements/SelectElement';
import countries from '../../constants/countries';

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  checkboxContainer: {
    marginTop: theme.spacing(2),
  },
}));

const CountryPromptModal = ({ open, onClose, onSave, onDismiss, currentCountry }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState(currentCountry || '');
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    setSelectedCountry(currentCountry || '');
  }, [currentCountry]);

  const handleSave = () => {
    if (selectedCountry) {
      onSave(selectedCountry);
    }
  };

  const handleClose = () => {
    setSelectedCountry('');
    if (dontShowAgain) {
      onDismiss();
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth disableEscapeKeyDown>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            {t('Dashboard.CountryPrompt.title')}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph className={classes.description}>
            {t('Dashboard.CountryPrompt.description')}
          </Typography>
        </Box>

        <SelectElement
          id="country"
          value={selectedCountry}
          onChange={(id, value) => setSelectedCountry(value)}
          selectData={countries}
          label={t('Dashboard.CountryPrompt.selectCountry')}
        />

        <Box className={classes.checkboxContainer}>
          <FormControlLabel
            control={
              <Checkbox
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                color="primary"
              />
            }
            label={t('Dashboard.CountryPrompt.dontShowAgain')}
          />
        </Box>
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={!selectedCountry}
        >
          {t('Dashboard.CountryPrompt.save')}
        </Button>
        <Button onClick={handleClose} variant="contained">
          {t('Dashboard.CountryPrompt.later')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CountryPromptModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  currentCountry: PropTypes.string,
};

export default CountryPromptModal;
