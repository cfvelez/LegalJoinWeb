import React from 'react'
import {Paper} from '@material-ui/core'
import MyPaperStyle from './MyPaperStyle'
import withWidth from '@material-ui/core/withWidth';

const MyPaper = (props) => {
  const width = props.width === 'xs' ? 200 : props.customWidth
  const style = MyPaperStyle(width)
    return (
        <Paper className={style.paper} variant="elevation" elevation={3} square>
          {props.children}
        </Paper>
    )
}

export default withWidth()(MyPaper)
