import axios from 'axios';
import {SERVER} from '../../../constants/'

export const create = async(contact) =>{;
 return axios.post(`${SERVER}/contact`, {
    name: contact.name,
    lastname: contact.lastName
  })
  .then((data) => {
    console.log(data)
    return true
  })
  .catch((e) =>{ console.log(e); return false; });
}

export const update = () =>{
  return "Update";
}

export const remove = () =>{
  return "Delete";
}
