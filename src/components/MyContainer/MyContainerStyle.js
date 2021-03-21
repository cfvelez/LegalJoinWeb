import {makeStyles} from '@material-ui/core'
import {drawerWidth} from '../../constants'

const MyContainerStyle = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,

    }),
    marginLeft: - drawerWidth,
    marginRight: 0,

  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    marginRight: 0
  },

  contentFix: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 3),
    // necessary for content to be below app bar
    marginTop: theme.mixins.toolbar.minHeight,
    justifyContent: "center"
  },

}))

export default MyContainerStyle
