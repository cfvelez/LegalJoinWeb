import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {all} from '../../../../app/remotes/Contact/';
import routes from '../../../routing/routes';
import {customHandledRedirect} from "../../../../utils/AppBehaviour";
import MyEditButton from '../../../../components/MyEditButton'
import MyDeleteButton from '../../../../components/MyDeleteButton'

const loadServerRows  = async(page) => {
  return await all();
  //return contacts.slice(page * 5, (page + 1) * 5);
}

/**
   * Config
   */
 const editAction = (id) => customHandledRedirect(routes.contact.edit.replace(':id' , id ));


 const colAction = (field, headerName, action ) => {
     return {
         field: field,
         headerName: headerName,
         disableClickEventBubbling: true,
         renderCell: (params) => {
           const onClick = () => {
             return action(params.row.id);
           };
           return field === 'edit' ?<MyEditButton onClick={onClick}>{headerName}</MyEditButton> : <MyDeleteButton onClick={onClick} >{headerName}</MyDeleteButton>;
         }
     };
   }

 const columns = [
     {field: "id", hide: true},
     {field: "name", headerName: "Nombre", width:100},
     {field: "lastname", headerName: "Apellidos", width:100},
     colAction('edit', 'Editar', (id)=>editAction(id)),
     colAction('delete', 'Borrar', (p)=>alert('Borrar:' + p))
 ];

 const myData = {'columns': columns , 'rows':[]};

const ContactList = () => {
  /**
   * Render data
   */

  let data = myData;
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
  }, [page, data]);

  return (
    <div style={{ height: 400, width: '50%'}}>
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

