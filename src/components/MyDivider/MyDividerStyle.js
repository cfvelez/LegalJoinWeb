import {makeStyles} from '@material-ui/core'

const MyDivFullWidthStyle = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
    margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`,
  }
}));

export default MyDivFullWidthStyle;
