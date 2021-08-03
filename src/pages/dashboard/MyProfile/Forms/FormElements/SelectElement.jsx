import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CustomTooltip } from '../../../../../shared/Tooltip';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  menu: {
    maxHeight: '300px',
  },
  label: {
    color: '#263238',
    paddingRight: 30,
    fontSize: 18,
    position: 'relative',
    width: 'max-content',
    '& + .MuiInput-formControl': {
      marginTop: 0,
    },
  },
  selectItem: {
    '&.MuiSelect-select': {
      paddingRight: 0,
    },
  },
});

const SelectElement = ({
  id,
  label,
  value,
  onChange,
  selectData,
  disabled = false,
  tooltipText,
}) => {
  const classes = useStyles();

  // TODO: pass value after updating DB on backend
  const defaultValue =
    id.includes('country') && value && value.length >= 3
      ? selectData.filter(item => item.code === value)[0].ISO
      : value;

  return (
    <FormControl className={classes.root}>
      <InputLabel shrink htmlFor={id} className={classes.label}>
        {label}
        {tooltipText && <CustomTooltip tooltipText={tooltipText} />}
      </InputLabel>
      <Select
        disabled={disabled}
        value={defaultValue}
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
          <MenuItem key={option.code} value={option.ISO || option.code}>
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
