import React, {useState} from 'react'
import MyAppStyle from './MyAppStyle'
import MyAppBar from '../MyAppBar'
import MyMenu from '../MyMenu'
import MyDrawer from '../MyDrawer'
import MyContainer from '../MyContainer'
import RoutingSystem from '../../app/routing/'
import {useDispatch,useSelector} from 'react-redux'
import {push_route} from '../../redux/actions/navigation'
import {BrowserRouter} from "react-router-dom";
import AuthManager from '../../utils/AuthManager'

const MyApp = () => {
  const style = MyAppStyle()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const {navigation, user} = useSelector(state => state)
  const changeDestination = (url) => navigation !== url ? dispatch(push_route(url)) : false;
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
        <MyContainer open={open && isAuthorized}> <RoutingSystem/></MyContainer>
      </BrowserRouter>
    </div>
  )
}

export default (MyApp)
