import React from 'react'
import {Alert} from '@material-ui/lab/';

const MyAlert = (props) => {
  return (<Alert severity={props.severity}>{props.children}</Alert>)
}

export default MyAlert
