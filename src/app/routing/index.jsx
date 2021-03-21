import React from 'react'
import Home from '../ui/Home'
import Login from '../ui/Login'
import Contact from '../ui/Contact'
import {
  Switch,
  Route,
} from "react-router-dom";
import routes from './routes'

const RoutingSystem = () => {
  return (
    <Switch>
      <Route path={routes.home.root} exact>
        <Home/>
      </Route>
      <Route path={routes.login.login} exact>
        <Login/>
      </Route>
      <Route path={routes.contact.list} exact>
        <Contact/>
      </Route>
      <Route>
        <Login/>
      </Route>
    </Switch>
  )
}

export default RoutingSystem
