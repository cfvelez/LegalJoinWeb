import React from 'react'
import {IconButton} from '@material-ui/core'
import MyIconButtonStyle from './MyIconButtonStyle'

const MyIconButton = (props) => {
  const style = MyIconButtonStyle()
  return (
    <IconButton aria-label={props.label} color={props.color} className={style.position} onClick={props.onClick}>
      {props.children}
    </IconButton>
      );
}

export default MyIconButton
