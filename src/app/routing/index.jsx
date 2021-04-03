import React from 'react'
import Home from '../ui/Home'
import Login from '../ui/Login'
import ContactForm from '../ui/Contact/ContactForm'
import ContactList from '../ui/Contact/List'
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
      <PrivateRoute component={ContactList} user={props.user} path={routes.contact.list} exact />
      <PrivateRoute component={ContactForm} user={props.user} path={routes.contact.new} exact />
      <PrivateRoute component={ContactForm} user={props.user} path={routes.contact.edit} exact />
      <Route>
        <Login/>
      </Route>
    </Switch>
  )
}

export default RoutingSystem
