import React,{ useState } from 'react';
import {Grid,Typography,Link} from '@material-ui/core'
import {AccountCircle,VpnKey} from '@material-ui/icons'
import lang, {def_user,def_pass} from '../../../constants'
import MyDiv from '../../../components/MyDiv'
import MyAlert from '../../../components/MyAlert'
import MyButton from '../../../components/MyButton'
import MyPaper from '../../../components/MyPaper'
import MyTextField from '../../../components/MyTextField'
import {getUser, authUser} from '../../remotes/Auth'
import {useDispatch} from 'react-redux'
import {update_user} from '../../../redux/actions/user'

const Login = () => {
  const [username, setUsername] = useState(def_user);
  const [password, setPassword] = useState(def_pass);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const doLogin = () => {
    setOpen(false)
    if(authUser(username,password)){
      const userInfo = getUser();
      dispatch(update_user(userInfo))
      return true
    }
    setOpen(true)
    return false
  }

  return (
    <MyPaper customWidth={'40%'}>
        <Grid container spacing={4} direction="column" alignItems="center" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5">{lang.login_lb}</Typography>
          </Grid>

          <Grid item xs={12}>
            <MyTextField
                placeholder={lang.user_lb}
                name="user"
                icon={<AccountCircle />}
                value={username}
                onChange = {(e) => setUsername(e.target.value)}
            >
            </MyTextField>
          </Grid>

          <Grid item xs={12}>
            <MyTextField
                type="password"
                placeholder={lang.pass_lb}
                name="password"
                value={password}
                onChange = {(e) => setPassword(e.target.value)}
                icon = {<VpnKey />}
            >
            </MyTextField>
          </Grid>

          <Grid item xs={12} >
            <Grid container direction="row" spacing={2} alignItems="center" justify="center">
              <Grid item xs={12} sm={6} >
                <MyButton color="primary" onClick={ ()=>doLogin()}>{lang.login_btn}</MyButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyButton color="secondary">{lang.register_btn}</MyButton>
              </Grid>
            </Grid>
          </Grid>

         <MyDiv open={open}>
            <Grid item xs={12}>
              <MyAlert severity={"error"}>{lang.login_error_lb}</MyAlert>
            </Grid>
         </MyDiv>

          <Grid item xs={12}>
            <Link href="#" variant="body2">{lang.forgotpass_btn}</Link>
          </Grid>

        </Grid>
    </MyPaper>
   );
}

export default Login;
