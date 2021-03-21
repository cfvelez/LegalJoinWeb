import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import MyLinearIndeterminateStyle from './MyLinearIndeterminateStyle'

const MyLinearIndeterminate = (props) => {
  const style = MyLinearIndeterminateStyle();
  return (
    <div className={style.progress}>
      <LinearProgress />
    </div>
  );
}

export default MyLinearIndeterminate
