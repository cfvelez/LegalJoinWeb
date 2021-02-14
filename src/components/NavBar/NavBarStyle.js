import {makeStyles} from '@material-ui/core'

const NavBarStyle = makeStyles(theme => ({
  offset:  theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
}))

export default NavBarStyle
