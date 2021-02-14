import React from 'react'
import {Paper} from '@material-ui/core'
import MyPaperStyle from './MyPaperStyle'

const MyPaper = (props) => {
  const style = MyPaperStyle()
    return (
        <Paper className={style.paper} variant="elevation">
          {props.children}
        </Paper>
    )
}

export default MyPaper
