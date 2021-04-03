import React from 'react'
import {IconButton} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import MyAddButtonStyle from './MyAddButtonStyle'

const MyAddButton = () => {
  const style = MyAddButtonStyle()
  return (
    <IconButton aria-label="add" color="primary" className={style.position}>
      <AddBoxIcon/>
    </IconButton>
      );
}

export default MyAddButton
