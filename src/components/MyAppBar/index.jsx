import React from 'react'
import MyAppBarStyle from './MyAppBarStyle'
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core'
import {ExitToApp,AccountCircle,Menu} from '@material-ui/icons/';
import {BRAND_NAME} from '../../constants'
import {Link as RouterLink} from "react-router-dom";
import routes from '../../app/routing/routes'
import clsx from 'clsx';
import {useDispatch} from 'react-redux'
import {update_user} from '../../redux/actions/user'

const MyAppBar = (props) => {
  const dispatch = useDispatch();

  const closeBtnAction = () => {
   return doLogOut() ? props.onClickForNavigate(routes.home.root) : false;
  }
  const accountBtnAction = () => {
    console.log('settings...')
    props.onClickForNavigate(routes.login.login)
    return true;
  }

  const doLogOut = () => {
    if(props.isAuthorized){
      return props.user.logOut() ? dispatch(update_user(null)) : false;
    }
    return false
  }

  const style = MyAppBarStyle()
    return (
      <div >
        <AppBar position="fixed"
          className={clsx(style.appBar, {[style.appBarShift]: props.open && props.isAuthorized,})}>
          <Toolbar>
          {!props.open && props.isAuthorized &&
              <IconButton
                color="inherit"
                aria-label="menu"
                className={style.menuButton}
                onClick = {props.onClickDrawer}>
                  <Menu />
              </IconButton>
            }

            <Typography variant="h6" className={style.title}>{BRAND_NAME}</Typography>
            <IconButton
                  color="inherit"
                  aria-label="account"
                  component={RouterLink}
                  to={routes.login.login}
                  onClick= {() => accountBtnAction()}
                  >
              <AccountCircle />
            </IconButton>

          {props.isAuthorized &&
            <IconButton
                color="inherit"
                aria-label="close"
                component={RouterLink}
                to={routes.home.root}
                onClick= {() => closeBtnAction()}>
                <ExitToApp />
            </IconButton>
          }

          </Toolbar>
        </AppBar>
      </div>
    )
}

export default MyAppBar