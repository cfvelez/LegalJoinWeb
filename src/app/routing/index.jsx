import React from 'react'
import Home from '../ui/Home'
import Login from '../ui/Login'
import StoryForm from '../ui/Story/StoryForm'
import StoryPointForm from '../ui/StoryPoint/StoryPointForm'
import StoryList from '../ui/Story/List'
import ContactForm from '../ui/Contact/ContactForm'
import ContactList from '../ui/Contact/List'
import VoiceRecorder from '../ui/VoiceRecorder'
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
      <PrivateRoute component={StoryForm} user={props.user} path={routes.story.edit} exact />
      <PrivateRoute component={StoryPointForm} user={props.user} path={routes.storypoint.new} exact />
      <PrivateRoute component={StoryList} user={props.user} path={routes.story.list} exact />
      <PrivateRoute component={StoryForm} user={props.user} path={routes.story.new} exact />
      <PrivateRoute component={VoiceRecorder} user={props.user} path={routes.recorder.record} exact />
      <Route>
        <Login/>
      </Route>
    </Switch>
  )
}

export default RoutingSystem
