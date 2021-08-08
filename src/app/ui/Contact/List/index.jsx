import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {all} from '../../../../app/remotes/Contact/';
import routes from '../../../routing/routes';
import {changeDestination} from "../../../../utils/AppBehaviour";
import MyEditButton from '../../../../components/MyEditButton';
import Contact from '../../../domains/Contact'
import MyDeleteButton from '../../../../components/MyDeleteButton';
import {useHistory} from "react-router-dom";

const loadServerRows  = async(page) => {
  return await all();
  //return contacts.slice(page * 5, (page + 1) * 5);
}

/**
   * colAction - Config custom columns
   */
 const colAction = (field, headerName, action ) => {
     return {
         field: field,
         headerName: headerName,
         disableClickEventBubbling: true,
         width:150,
         renderCell: (params) => {
           const onClick = () => {
             return action(params.row.id);
           };
           return field === 'edit' ?<MyEditButton onClick={onClick}>{headerName}</MyEditButton> : <MyDeleteButton onClick={onClick} >{headerName}</MyDeleteButton>;
         }
     };
   }

 /**
  * End - Config
  */

const ContactList = () => {
  /**
   * States data
   */
  let history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const editAction = (id) => {
     let destiny = routes.contact.edit.replace(':id' , id );
     changeDestination(destiny);
     history.replace(destiny);
  };

  const deleteAction = async (id) => {
    setLoading(true);
    let result = await Contact.remove(id);
    if( result === true){
      const newRows = await loadServerRows(page);
      setRows(newRows);
    }
    setLoading(false);
  }

  const myGridSetup = () => {
    const columns = [
      {field: "id", hide: true},
      {field: "name", headerName: "Nombre", width:150},
      {field: "lastname", headerName: "Apellidos", width:150},
      colAction('edit', 'Editar', (id)=>editAction(id)),
      colAction('delete', 'Borrar', (id)=>deleteAction(id))
    ];
    return {'columns': columns , 'rows':[]}
  }

  let data = myGridSetup();

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(page);

      if (!active) {
        return;
      }
      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page]);

  return (
    <div style={{ height: 400, width: '70%'}}>
      <DataGrid
        rows={rows}
        columns={data.columns}
        pagination
        pageSize={0}
        rowCount={20}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
}
export default ContactList

