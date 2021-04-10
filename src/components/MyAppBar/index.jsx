import React from 'react'
import MyAppBarStyle from './MyAppBarStyle'
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core'
import {ExitToApp,AccountCircle,Menu,Add} from '@material-ui/icons/';
import {BRAND_NAME} from '../../constants'
import {Link as RouterLink, useHistory} from "react-router-dom";
import routes from '../../app/routing/routes'
import clsx from 'clsx';
import User from '../../app/domains/User'
import {getAddRoute} from '../../utils/AppBehaviour';

const MyAppBar = (props) => {
  let history = useHistory();

  const closeBtnAction = () => {
   return doLogOut() ? props.onClickForNavigate(routes.login.login) : false;
  }

  const addBtnAction = (route) => {
    if(props.onClickForNavigate(route)){
      history.replace(route);
    }
  }

  const accountBtnAction = () => {
    props.onClickForNavigate(routes.home.root)
    return true;
  }

  const doLogOut = () => {
    if(props.isAuthorized === true){
      User.logOut();
    }
    return false
  }
  const ShowOptions = (props) =>{
    const presentScreen = getAddRoute();
    let options = <></>
    if(props.visible === true){
       options =
            (<>
               {presentScreen &&
                <IconButton
                  color="inherit"
                  aria-label="new"
                  onClick= {() => addBtnAction(presentScreen)}>
                  <Add />
                  </IconButton>
              }
              <IconButton
                  color="inherit"
                  aria-label="account"
                  component={RouterLink}
                  to={routes.login.login}
                  onClick= {() => accountBtnAction()}>
                <AccountCircle />
              </IconButton>
              <IconButton
                  color="inherit"
                  aria-label="close"
                  component={RouterLink}
                  to={routes.home.root}
                  onClick= {() => closeBtnAction()}>
                  <ExitToApp />
              </IconButton>
            </>);
    }
    return options;
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
          <ShowOptions visible={props.isAuthorized} />
          </Toolbar>
        </AppBar>
      </div>
    )
}

export default MyAppBar
