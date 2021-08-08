import {create, update, remove, get} from '../remotes/StoryPoint'
export default class StoryPoint {

  constructor (id,storyId, name, description,appointmentAt) {
    this.id = id;
    this.storyId = storyId;
    this.name = name;
    this.description = description;
    this.appointmentAt = appointmentAt;
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
