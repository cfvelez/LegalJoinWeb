import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {all} from '../../../../app/remotes/Story/';
import routes from '../../../routing/routes';
import {changeDestination} from "../../../../utils/AppBehaviour";
import MyEditButton from '../../../../components/MyEditButton';
import Story from '../../../domains/Story'
import MyDeleteButton from '../../../../components/MyDeleteButton';
import MyIconButton from '../../../../components/MyIconButton';
import {useHistory} from "react-router-dom";
import AttachmentIcon from '@material-ui/icons/Attachment';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const loadServerRows  = async(page) => {
  return await all();
  //return contacts.slice(page * 5, (page + 1) * 5);
}

/**
   * colAction - Config custom columns
   */
 const colAction = (field, headerName, action, witdth ) => {

     return {
         field: field,
         headerName: headerName,
         disableClickEventBubbling: true,
         width:witdth,
         renderCell: (params) => {

           const onClick = () => {
             return action(params.row.id);
           };

           let uiComponent = null;
           switch (field){
              case 'edit':
                uiComponent = <MyEditButton onClick={onClick}>{headerName}</MyEditButton> ;
              break;

              case 'delete':
                uiComponent = <MyDeleteButton onClick={onClick} >{headerName}</MyDeleteButton> ;
              break;

              case 'storypoint':
                uiComponent =  <MyIconButton onClick={onClick} color="primary" label="seguimiento"><BookmarksIcon/></MyIconButton> ;
              break;

              case 'resource':
                uiComponent =  <MyIconButton onClick={onClick} color="primary" label="recurso"><AttachmentIcon/></MyIconButton> ;
              break;

              default:
                uiComponent =  <MyEditButton onClick={onClick}>{headerName}</MyEditButton> ;
              break;
           }

         return uiComponent;
        },
      }
 }

 /**
  * End - Config
  */

const StoryList = () => {
  /**
   * States data
   */
  let history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const editAction = (id) => {
     let destiny = routes.story.edit.replace(':id' , id );
     changeDestination(destiny);
     history.replace(destiny);
  };

  const addResource = (id) => {
    let destiny = routes.recorder.record.replace(':id' , id );
    changeDestination(destiny);
    history.replace(destiny);
 };

 const addStoryPoint = (id) => {
  let destiny = routes.storypoint.new.replace(':storyId' , id );
  changeDestination(destiny);
  history.replace(destiny);
};

  const deleteAction = async (id) => {
    setLoading(true);
    let result = await Story.remove(id);
    if( result === true){
      const newRows = await loadServerRows(page);
      setRows(newRows);
    }
    setLoading(false);
  }

  const myGridSetup = () => {
    const columns = [
      {field: "id", hide: true},
      {field: "title", headerName: "Título", width:200},
      colAction('edit', 'Editar', (id)=>editAction(id), 120),
      colAction('delete', 'Borrar', (id)=>deleteAction(id), 120),
      colAction('storypoint', 'Evento', (id)=>addStoryPoint(id),140),
      colAction('resource', 'Recurso', (id)=>addResource(id),140)
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
export default StoryList

