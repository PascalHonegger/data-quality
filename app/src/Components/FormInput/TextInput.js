import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const TextInput = ({
  id,
  label,
  helperText,
  error,
  value,
  onChange,
  numeric,
  touched, // eslint-disable-line
  ...props
}) => {
  return (
    <FormControl style={{ width: '250px', margin: '15px' }} error={!!error}>
      <FormControlLabel
        control={
          <React.Fragment>
            <TextField
              id={id}
              label={label}
              helperText={helperText}
              onChange={onChange}
              value={value}
              type={numeric ? 'number' : 'text'}
              {...props}
            />
          </React.Fragment>
        }
        label={''}
      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default TextInput;

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
};