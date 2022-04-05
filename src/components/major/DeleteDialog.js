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
import styles from "./DeleteDialog.module.css";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import faker from 'faker';
import { majorApi } from "../../apis/major";

export const DeleteDialog = (props) => {
  const [text, setText] = useState("");
  const [parentId, setParentId] = useState(null);
  const [name, setName] = useState("");
  const status = 'ACTIVE'
  const [parent, setParent] = useState(null);
  const [droppable, setDroppable] = useState(false);
  var major = {};
  const id = faker.datatype.uuid();
  const majorId = props.majorId
  console.log(majorId);
  // const firstNode = props.firstNode;
  // console.log(firstNode.id)

  const handleChangeText = (e) => {
    setText(e.target.value);
    setName(e.target.value);
  };

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Xác nhận xóa ?</DialogTitle>
      <DialogActions>
        <Button color="error" endIcon={<CloseIcon />} onClick={props.onClose}>Hủy</Button>
        <Button
          endIcon={<CheckIcon />}
          onClick={() => {
            majorApi.update(majorId ,{
                status : 'INACTIVE'
            }).finally(props.onClose)
          }
          }
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};
