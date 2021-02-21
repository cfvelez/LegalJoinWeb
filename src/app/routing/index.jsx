import React from 'react'
import Home from '../ui/Home'
import Login from '../ui/Login'
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
      <Route>
        <Home/>
      </Route>
    </Switch>
  )
}

export default RoutingSystem
