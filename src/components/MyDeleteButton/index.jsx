import React from 'react'
import {IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import MyDeleteButtonStyle from './MyDeleteButtonStyle'

const MyDeleteButton = (props) => {
  const style = MyDeleteButtonStyle()
  return (
    <IconButton aria-label="delete" color="secundary" className={style.position} onClick={props.onClick}>
      <DeleteIcon/>
    </IconButton>
      );
}

export default MyDeleteButton
