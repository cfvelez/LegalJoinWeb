import {create, update, remove, get} from '../remotes/Story'
export default class Story {

  constructor (id,contactId, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.contactId = contactId;
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


}
