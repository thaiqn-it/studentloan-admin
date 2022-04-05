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
import styles from "./UpdateDialog.module.css";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import faker from 'faker';
import { majorApi } from "../../apis/major";

export const UpdateDialog = (props) => {
  const [text, setText] = useState(props.major.name);
  const [parentId, setParentId] = useState(null);
  const [name, setName] = useState("");
  const status = 'ACTIVE'
  const [parent, setParent] = useState(null);
  const [droppable, setDroppable] = useState(false);
  var major = {};
  const id = faker.datatype.uuid();
  const majorUpdate = props.major
  // const firstNode = props.firstNode;
  // console.log(firstNode.id)

  const handleChangeText = (e) => {
    setText(e.target.value);
    setName(e.target.value);
  };

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Chỉnh sửa ngành</DialogTitle>
      <DialogContent className={styles.content}>
        <div>
          <TextField fullWidth label="Tên ngành" type={"text"} style={{ width : 500 }} onChange={handleChangeText} value={text} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="error" endIcon={<CloseIcon />} onClick={props.onClose}>Hủy</Button>
        <Button
          endIcon={<CheckIcon />}
          disabled={text === ""}
          onClick={() => {
            majorApi.update(majorUpdate.id ,{
                name
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
