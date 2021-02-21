import React from 'react'
import {ThemeProvider} from '@material-ui/core/styles'
import defaultTheme from './styles/defaultTheme'
import darkTheme from './styles/darkTheme'
import {Theme} from './constants'
import MyApp from './components/MyApp'

function App() {
  return (
    <ThemeProvider theme={Theme === 'default' ? defaultTheme : darkTheme}>
      <MyApp />
    </ThemeProvider>
  );
}

export default App;
