import React from 'react'
import {Divider, Drawer, IconButton} from '@material-ui/core'
import {ChevronLeft} from '@material-ui/icons'
import MyDrawerStyle from './MyDrawerStyle'

const MyDrawer = (props) => {
  const style = MyDrawerStyle()

  return (
    <Drawer
        className={style.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: style.drawerPaper,
        }}
      >
        <div className={style.drawerHeader}>
          <IconButton onClick={props.onClick ? props.onClick : null}>
             <ChevronLeft />
          </IconButton>
        </div>
        <Divider/>
        {props.children}
      </Drawer>
  )
}

export default MyDrawer
