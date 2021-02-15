import React from 'react'
import Home from '../ui/Home'
import Login from '../ui/Login'
import {
  BrowserRouter as Router ,
  Switch,
  Route
} from "react-router-dom";
import routes from './routes'

const RoutingSystem = () => {
  console.log(routes)
  return (
    <Router>
      <Switch>
      <Route path='/' exact>
        <Home/>
      </Route>
      <Route path='/login' exact>
        <Login/>
      </Route>
      </Switch>
    </Router>
  )
}

export default RoutingSystem
