import {create, update, remove} from '../remotes/Contact'
export default class Contact {

  constructor (id, first_name, last_name) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
  }

  sayHello() {
   return 'Hello';
  }

  create(){
    return create(this);
  }

  update(){
    return update();
  }

  delete(){
    return remove();
  }
}
