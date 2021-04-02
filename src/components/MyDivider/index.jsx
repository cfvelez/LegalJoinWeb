import React from 'react'
import {Divider} from '@material-ui/core';
import MyDividerStyle from '../MyDivider/MyDividerStyle'

const MyDivider = () => {
  const style = MyDividerStyle();
  return(<Divider className={style.fullWidth}/>);
}

export default MyDivider;
