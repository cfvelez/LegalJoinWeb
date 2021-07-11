import {create, update, remove, get, all} from '../remotes/Contact'
export default class Contact {

  constructor (id, name, lastName) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
  }

  create(){
    return create(this);
  }

  update(){
    return update(this);
  }

  static async remove(id){
    return remove(id);
  }

  static async getById(id){
    return await get(id);
  }

  static async getAll(){
    return await all();
  }


}
