import React, {useState} from 'react'
import MyAppStyle from './MyAppStyle'
import MyAppBar from '../MyAppBar'
import MyMenu from '../MyMenu'
import MyDrawer from '../MyDrawer'
import MyContainer from '../MyContainer'
import MyAlert from '../MyAlert';
import RoutingSystem from '../../app/routing/'
import {useSelector} from 'react-redux'
import {changeDestination} from '../../utils/AppBehaviour'
import {BrowserRouter} from "react-router-dom";
import AuthManager from '../../utils/AuthManager'

const MyApp = () => {
  const style = MyAppStyle()
  const [open, setOpen] = useState(false)
  const {user, status} = useSelector(state => state)

  const handleClickMenuItem = (route) => changeDestination(route);
  const isAuthorized = AuthManager.isAuthenticated(user);
  console.log('Render..')
  return (
    <div className={style.root}>
      <BrowserRouter>
        <MyAppBar
          isAuthorized = {isAuthorized}
          user = {user}
          open={open}
          onClickDrawer={()=>setOpen(true)}
          onClickForNavigate = {(path) => handleClickMenuItem(path)}/>
          <MyDrawer open={open && isAuthorized} onClick={()=>setOpen(false)}>
             <MyMenu onClick = {(path) => handleClickMenuItem(path)}/>
          </MyDrawer>
        <MyContainer open={open && isAuthorized} loading={status.loading}>
          <MyAlert visible={status.notification.visible} severity={status.notification.type} >{status.notification.message}</MyAlert>
          <RoutingSystem user = {user}/>
        </MyContainer>
      </BrowserRouter>
    </div>
  )
}
export default (MyApp)
