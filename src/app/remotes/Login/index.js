
import login from './mock';
import User from '../../domains/User'

export const getUser = () => {
    const {first_name,last_name,email,phone_number} = login.userData;
    return new User(first_name,last_name,email,phone_number);
}

export const authUser = (user, password) =>{
    if(user == 'cfvelez' && password == '123456')
      return true
    else
      return false;
}
