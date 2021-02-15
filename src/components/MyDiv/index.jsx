import React from 'react'
import MyDivStyle from './MyDivStyle'

const MyDiv = (props) => {
  const style = MyDivStyle()
  return (<div className={props.open ? style.visible : style.hidden} >{props.children}</div>)
}

export default MyDiv
