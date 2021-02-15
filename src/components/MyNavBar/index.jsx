import React from 'react'
import MyNavBarStyle from './MyNavBarStyle'
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core'
import {ExitToApp,AccountCircle,Menu} from '@material-ui/icons/';
import {BRAND_NAME} from '../../constants'
import clsx from 'clsx';

const MyNavBar = (props) => {

  const style = MyNavBarStyle()
    return (
      <div >
        <AppBar position="fixed"
          className={clsx(style.appBar, {[style.appBarShift]: props.open,})}>
          <Toolbar>
          {!props.open &&
              <IconButton
                color="inherit"
                aria-label="menu"
                className={style.menuButton}
                onClick = {props.onClick}>
                  <Menu />
              </IconButton>}
            <Typography variant="h6" className={style.title}>{BRAND_NAME}</Typography>
            <IconButton color="inherit" aria-label="close"><AccountCircle /></IconButton>
            <IconButton color="inherit" aria-label="close"><ExitToApp /></IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
}

export default MyNavBar
