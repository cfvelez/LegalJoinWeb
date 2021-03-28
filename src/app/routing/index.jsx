import React from 'react'
import Home from '../ui/Home'
import Login from '../ui/Login'
import ContactForm from '../ui/Contact/ContactForm'
import PublicRoute from './Routes/PublicRoute'
import PrivateRoute from './Routes/PrivateRoute'
import {
  Switch,
  Route,
} from "react-router-dom";
import routes from './routes'

const RoutingSystem = (props) => {
  return (
    <Switch>
      <PublicRoute restricted={false} component={Home} path={routes.home.root} exact />
      <PublicRoute restricted={false} component={Login} path={routes.login.login} exact />
      <PrivateRoute component={ContactForm} user={props.user} path={routes.contact.list} exact />
      <Route>
        <Login/>
      </Route>
    </Switch>
  )
}

export default RoutingSystem
