import {makeStyles} from '@material-ui/core'

const MyMenuStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginLeft: 2
  },
}));

export default MyMenuStyle
