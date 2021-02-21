
import React, {useState} from 'react';
import {List,ListItem,ListItemText,Divider} from '@material-ui/core/';
import {Inbox,Drafts} from '@material-ui/icons/';
import MyMenuItemLink from '../MyMenuItemLink'
import MyMenuStyle from './MyMenuStyle'
import routes from '../../app/routing/routes'

export default function MyMenu(props) {
  const styles = MyMenuStyle();
  const [selected, setSelected] = useState('')

  const handleItemClick = (route) =>{
    props.onClick(route)
    setSelected(route)
  }
  const login = routes.login.login;
  const home = routes.home.root;
  return (
    <div className={styles.root}>
      <List component="nav" aria-label="main mailbox folders">
        <MyMenuItemLink
          to={login}
          onClick={() => handleItemClick(login)}
          icon={<Inbox />}
          text="Inbox"
          selected = {selected === login ? true : false}
        />
        <MyMenuItemLink
          to={home}
          onClick={() => handleItemClick(home)}
          icon={<Drafts />}
          text="Drafts"
          selected = {selected === home ? true : false}
        />
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem
          onClick={() => handleItemClick(home)}
          selected = {selected === home ? true : false}
          button>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </div>
  );
}
