
import React from 'react';
import {List,ListItem,ListItemIcon,ListItemText,Divider} from '@material-ui/core/';
import {Inbox,Drafts} from '@material-ui/icons/';
import MyMenuStyle from './MyMenuStyle'

export default function SimpleList() {
  const styles = MyMenuStyle();

  return (
    <div className={styles.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </div>
  );
}
