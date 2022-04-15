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

  const handleChangeText = (e) => {
    setText(e.target.value);
    setName(e.target.value);
  };

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Thêm ngành mới</DialogTitle>
      <DialogContent className={styles.content}>
        <div>
          <TextField fullWidth label="Tên" type={"text"} style={{ width : 500 }} onChange={handleChangeText} value={text} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="error" endIcon={<CloseIcon />} onClick={props.onClose}>Hủy</Button>
        <Button
          endIcon={<CheckIcon />}
          disabled={text === ""}
          onClick={() => {
            major = {
              id: id,
              name,
              status,
              schoolId
            }
            majorApi.create(major).finally(props.onClose);
          }
          }
        >
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
