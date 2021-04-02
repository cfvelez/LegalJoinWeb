import React from 'react'
import {Alert} from '@material-ui/lab/';
import MyDiv from '../MyDiv';

const MyAlert = (props) => {
  return (<MyDiv open={props.visible}><Alert severity={props.severity}>{props.children}</Alert></MyDiv>)
}

export default MyAlert
