import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles({
  menu: {
    maxHeight: '300px',
  },
  label: {
    color: '#263238',
  },
  selectItem: {
    '&.MuiSelect-select': {
      paddingRight: '0',
    },
  },
});

const SelectElement = ({ id, label, value, onChange, selectData }) => {
  const classes = useStyles();

  return (
    <FormControl margin='normal'>
      <InputLabel shrink htmlFor={id} className={classes.label}>
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={event => onChange(id, event.target.value)}
        inputProps={{
          id,
        }}
        MenuProps={{
          classes: {
            paper: classes.menu,
          },
        }}
        classes={{
          select: classes.selectItem,
        }}
      >
        {selectData.map(option => (
          <MenuItem key={option.code} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectElement.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectData: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

SelectElement.defaultProps = {
  helperText: '',
};

export default SelectElement;
