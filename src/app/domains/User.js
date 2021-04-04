import {logOut} from '../../utils/AppBehaviour'
export default class User {

  constructor (first_name, last_name, email, phone_number) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone_number = phone_number;
  }

  sayHello() {
   return 'Hello'
  }

  static logOut(){
    return logOut()
  }

}
