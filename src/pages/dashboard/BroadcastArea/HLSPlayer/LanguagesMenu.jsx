import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const LanguagesMenu = ({ languages, onLangSelected }) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const languagesToArray = Object.keys(languages).map(key => [
    key,
    languages[key],
  ]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, lang) => {
    setAnchorEl(null);
    lang && onLangSelected(lang);
  };

  return (
    <div>
      <Button
        aria-controls='languages-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        {t('Dashboard.BroadcastArea.broadcastLanguage')}
      </Button>
      <Menu
        id='languages-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={event => handleClose(event)}
      >
        {languagesToArray.map(lang => (
          <MenuItem
            key={lang[0]}
            onClick={event => handleClose(event, lang[0])}
          >
            {lang[1].Name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

LanguagesMenu.propTypes = {
  languages: PropTypes.object.isRequired,
  onLangSelected: PropTypes.func.isRequired,
};

export default LanguagesMenu;
