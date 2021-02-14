import React from 'react'
import NavBar from './components/NavBar'
import MyContainer from './components/MyContainer'
import {ThemeProvider} from '@material-ui/core/styles'
import defaultTheme from './styles/defaultTheme'
import darkTheme from './styles/darkTheme'
import Login from './app/ui/Login'
import {Theme} from './constants'

function App() {
  return (
    <ThemeProvider theme={Theme == 'default' ? defaultTheme : darkTheme}>
      <NavBar/>
      <MyContainer content={<Login></Login>}/>
    </ThemeProvider>
  );
}

export default App;
