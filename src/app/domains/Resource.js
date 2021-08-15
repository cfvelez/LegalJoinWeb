import {upload} from '../remotes/Resource'
export default class Resource {

  constructor (title, ownner_id, storypoint_id, base64File ) {
    this.title = title;
    this.ownner_id = ownner_id;
    this.storypoint_id = storypoint_id;
    this.base64File = base64File;
  }

  upload(){
    return upload(this);
  }

}
