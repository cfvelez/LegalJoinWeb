import React from 'react'
import {IconButton} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import MyEditButtonStyle from './MyEditButtonStyle'

const MyEditButton = (props) => {
  const style = MyEditButtonStyle()
  return (
    <IconButton aria-label="edit" color="primary" className={style.position} onClick={props.onClick}>
      <EditIcon/>
    </IconButton>
      );
}

export default MyEditButton
