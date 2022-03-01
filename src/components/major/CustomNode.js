import React, { useMemo, useState } from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { ArrowRight, Delete, FileCopy } from "@material-ui/icons";
import { useDragOver } from "@minoru/react-dnd-treeview";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
// import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";
import { TextField } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';

export const CustomNode = (props) => {
  const [visibleInput, setVisibleInput] = useState(false);
  const { id, text,status } = props.node;
  const [labelText, setLabelText] = useState(text);
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };


  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  const StyledTypography = useMemo(() => {
    return withStyles({
      root: {
        textDecoration: "line-through",
      }
    })(Typography);
  }, []);

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  const isInactiveNode = (status) =>{
    if (status ==="ACTIVE"){
      return(
        <>
            <Typography variant="body2">{props.node.text}</Typography>
            <div className={styles.actionButton}>
              <IconButton size="small" onClick={() => props.onDelete(id)}>
                <Delete fontSize="small" />
              </IconButton>
            </div>
            <div className={styles.actionButton}>
              <IconButton className={styles.editButton} onClick={handleShowInput}>
                <EditIcon className={styles.editIcon} />
              </IconButton>
            </div>
          </>
      )
    }else{
      return(
        <StyledTypography color="error" variant="body2">{props.node.text}</StyledTypography>
      )
    }
  }

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
    >
      <div
        className={`${styles.expandIconWrapper} ${props.isOpen ? styles.isOpen : ""
          }`}
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRight />
          </div>
        )}
      </div>
      <div>
      </div>
      <>
        {visibleInput ? (
          <div className={styles.inputWrapper}>
            <TextField
              className={`${styles.textField}
              ${styles.nodeInput}`}
              value={labelText}
              onChange={handleChangeText}
            />
            <IconButton
              className={styles.editButton}
              onClick={handleSubmit}
              disabled={labelText === ""}
            >
              <CheckIcon className={styles.editIcon} />
            </IconButton>
            <IconButton className={styles.editButton} onClick={handleCancel}>
              <CloseIcon className={styles.editIcon} />
            </IconButton>
          </div>
        ) : (
          <>
          {isInactiveNode(status)}
          </>
        )}
      </>
    </div>
  );
};
