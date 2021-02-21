import React from 'react';
import {ListItem,ListItemIcon,ListItemText} from '@material-ui/core/';
import {Link as RouterLink} from "react-router-dom";

export default function MyMenuItemLink(props) {
  return (
    <ListItem
        component={RouterLink} to={props.to}
        onClick={() => props.onClick(props.to)}
        selected={props.selected}
        button>
      <ListItemIcon>
          {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.text}/>
    </ListItem>
  )
}
