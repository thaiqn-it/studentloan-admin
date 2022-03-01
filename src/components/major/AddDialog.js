import React, { useState } from "react";
import {
  Select,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import Button from '@mui/material/Button';
import styles from "./AddDialog.module.css";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import faker from 'faker';
import { majorApi } from "../../apis/major";

export const AddDialog = (props) => {
  const [text, setText] = useState("");
  const [parentId, setParentId] = useState(null);
  const [name, setName] = useState("");
  const status = 'ACTIVE'
  const [parent, setParent] = useState(null);
  const [droppable, setDroppable] = useState(false);
  var major = {};
  const id = faker.datatype.uuid();
  const schoolId = props.schoolId
  // const firstNode = props.firstNode;
  // console.log(firstNode.id)

  const handleChangeText = (e) => {
    setText(e.target.value);
    setName(e.target.value);
  };

  const handleChangeParent = (e) => {
    if (droppable === true) {
      setParent(null)
      setParentId(null)
    } else {
      setParent(e.target.value);
      setParentId(e.target.value);
    }
  };

  const handleChangeDroppable = (e) => {
    setParent(null)
    setParentId(null)
    setDroppable(e.target.checked);
  };

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Tạo ngành/nhóm ngành mới</DialogTitle>
      <DialogContent className={styles.content}>
        <div>
          <TextField fullWidth label="Tên" type={"text"} onChange={handleChangeText} value={text} />
        </div>
        <div>
          <FormControl className={styles.select}>
            <InputLabel>Nhóm ngành</InputLabel>
            <Select
              disabled={droppable === true ? true : false}
              label="Parent" onChange={handleChangeParent} value={parent}>
              {/* <MenuItem key={firstNode.id} value={firstNode.id}>{firstNode.text}</MenuItem> */}
              {props.tree
                .filter((node) => node.parent === null)
                .map((node) => (
                  <MenuItem key={node.id} value={node.id}>
                    {node.text}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={droppable}
                onChange={handleChangeDroppable}
                color="primary"
              />
            }
            label="Là nhóm ngành?"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="error" endIcon={<CloseIcon />} onClick={props.onClose}>Hủy</Button>
        <Button
          endIcon={<CheckIcon />}
          disabled={text === ""}
          onClick={() => {
            major = [{
              id: id,
              name,
              parentId,
              schoolId,
              status,
            }]
            majorApi.create(major);
            parentId === null ? props.onSubmit({
              id: id,
              text: name,
              parent: parentId,
              name,
              droppable: true,
              parentId,
              status,
            }) : props.onSubmit({
              id: id,
              text: name,
              parent: parentId,
              name,
              droppable: false,
              parentId,
              status,
            })
          }
          }
        >
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
