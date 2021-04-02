import React from 'react'
import {Button} from '@material-ui/core'
import MyButtonStyle from './MyButtonStyle'

const MyButton = (props) => {
  const style = MyButtonStyle()
  return (
      <Button variant="contained"
        color={props.color ? props.color : "primary"}
        size= {props.size ? props.size : "small"}
        className={style.button}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
      )
}

export default MyButton
