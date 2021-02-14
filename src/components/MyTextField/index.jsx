import React from 'react'
import {TextField, InputAdornment} from '@material-ui/core'

const MyTextField = (props) => {

    const extra = {
      endAdornment: (
        <InputAdornment position="end">
          {props.icon}
        </InputAdornment>
      ),
    };

    return (
      <TextField
        type = { props.type ? props.type : '' }
        placeholder={props.placeholder}
        name={props.name}
        InputProps={ props.icon ? extra : {}}
        defaultValue={props.defaultValue}
        value={props.value}
        onClick={props.onClick}
        onChange={props.onChange}
        fullWidth>
      </TextField>
    )
}

export default MyTextField
