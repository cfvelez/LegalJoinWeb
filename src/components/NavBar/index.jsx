import React from 'react'
import NavBarStyle from './NavBarStyle'
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import {BRAND_NAME} from '../../constants'

const NavBar = () => {

  const style = NavBarStyle()
    return (
      <div >
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={style.title}>{BRAND_NAME}</Typography>
          </Toolbar>
        </AppBar>
        <div className={style.offset}></div>
      </div>
    )
}

export default  NavBar
