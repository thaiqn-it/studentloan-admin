import React, { useState } from "react";
import Button from '@mui/material/Button';
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import {
  Tree,
  getDescendants
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { AddDialog } from "./AddDialog";
import styles from "./MajorHandle.module.css";
import { theme } from "../major/theme"
import { Alert, Card, Snackbar } from "@mui/material";
import { majorApi } from "../../apis/major";

function MajorHandle(props) {
  const majorSchool = props.majorSchool
  const schoolId = props.schoolId

  //snackbar
  const vertical = 'bottom'
  const horizontal = 'right'
  const [colorMessage, setcolorMessage] = useState('')
  const [message, setmessage] = React.useState('')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSb(false);
  };

  const changeFormatData = (datas) => {
    datas.map((dataNote) => {
      dataNote.text = dataNote.name
      dataNote.parent = dataNote.parentId
      dataNote.parentId === null ? dataNote.droppable = true : dataNote.droppable = false
    })
    return datas
  }
  const formatTree = changeFormatData(majorSchool)
  const [treeData, setTreeData] = useState(formatTree);
  const [undoTreeData, setUndoTreeData] = useState(formatTree);
  const handleDrop = (newTree) => setTreeData(newTree);
  const [open, setOpen] = useState(false);
  const [openSb, setOpenSb] = useState(false);

  const handleDelete = (id, value) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          status: "INACTIVE"
        };
      }
      if (node.parent !== null && node.parent === id) {
        return {
          ...node,
          status: "INACTIVE"
        };
      }
      return node;
    });
    
    setTreeData(newTree);
  };


  const handleTextChange = (id, value) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text: value,
        };
      }
      return node;
    });
    setTreeData(newTree);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = (newNode) => {
    console.log(newNode)
    setTreeData([
      ...treeData,
      {
        ...newNode,
      }
    ]);

    setOpen(false);
  };

  const wontDragAble = (droppable, status) =>{
    if(droppable===true ||status ==="INACTIVE"){
      return false
    }else{
      return true
    }
  }

  return (
    <Card
      sx={{
        padding: 2
      }}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseLine />
          <Button
            size="large"
            sx={{
              margin: 1
            }}
            variant="contained" onClick={handleOpenDialog} startIcon={<AddIcon />}>
            Tạo ngành/nhóm ngành
          </Button>

          <Button
            size="large"
            sx={{
              margin: 1
            }}
            variant="contained" onClick={() => {
              majorApi.update(treeData).then(res => {
                setOpenSb(true);
                setcolorMessage('success')
                setmessage('Lưu thành công!')
              }).catch(
                (e) => {
                  setcolorMessage('error')
                  setmessage('Lưu thất bại!')
                }
              )
            }
            } startIcon={<CheckIcon />}>
            Lưu
          </Button>

          <Button
            size="large"
            sx={{
              margin: 1
            }}
            variant="contained" onClick={() => {
              setTreeData(undoTreeData);
              setOpenSb(true);
              setcolorMessage('success')
              setmessage('Reset thành công!')
            }
            } startIcon={<AutorenewIcon />}>
            Reset
          </Button>
          {open && (
            <AddDialog
            // firstNode={treeData[0]}
              tree={treeData}
              schoolId={schoolId}
              onClose={handleCloseDialog}
              onSubmit={handleSubmit}
            />
          )}

            <Tree
              tree={treeData}
              rootId={null}
              // render={(node, options) => {
              //   if (node.status === "ACTIVE") {
              //     return (
              //       <CustomNode
              //         node={node}
              //         {...options}
              //         onDelete={handleDelete}
              //         onTextChange={handleTextChange}
              //       />
              //     );
              //   }
              //   else {
              //     return <></>
              //   }
              // }}
              render={(node, options) => (
                <CustomNode
                  node={node}
                  {...options}
                  onDelete={handleDelete}
                  onTextChange={handleTextChange}
                />
              )}
              dragPreviewRender={(monitorProps) => (
                <CustomDragPreview monitorProps={monitorProps} />
              )}
              canDrag={(node)=>wontDragAble(node.droppable, node.status)}
              onDrop={handleDrop}
              classes={{
                root: styles.treeRoot,
                draggingSource: styles.draggingSource,
                dropTarget: styles.dropTarget
              }}
            />
        </ThemeProvider>
        <Snackbar open={openSb} anchorOrigin={{ vertical, horizontal }} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={colorMessage} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </StylesProvider>
    </Card>
  );
}

export default MajorHandle;
