import React, { useState } from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { QuestionAnswerForm } from "../questionAnswerForm/questionAnswerForm";

import styles from "./modal.module.scss";

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "10px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 4),
      width: "600px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  })
);

export default function ModalWindow({ addEmployee }) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  
  const questions = {
    id: "Введите id работника",
    firstName: "Введите имя работника",
    lastName: "Введите фамилию работника",
    email: "Введите email",
  }

  const [correctValueInputs, setCorrectValueInputs] = useState({
    id: false,
    firstName: false,
    lastName: false,
    email: false,
  });

  const patternRegexp = {
    id: "^[0-9]{1,10}$",
    firstName: "^[A-ZА-Я][a-zа-я]{1,}$",
    lastName: "^[A-ZА-Я][a-zа-я]{1,}$",
    email: "^[a-zA-Z0-9!#$%'*+-/=?^_`{|}~.]+@[a-zA-Z0-9]+[.][a-zA-Z0-9]+$",
  };

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    const regexp = new RegExp(patternRegexp[e.target.name]);
    const correctValue = e.target.value ? regexp.test(e.target.value) : false;
    setCorrectValueInputs({
      ...correctValueInputs,
      [e.target.name]: correctValue
    });
  };

  let [pressButtonState, setPressButtonState] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setPressButtonState(true);
    if (!Object.values(correctValueInputs).includes(false)) {
      addEmployee(data)
      handleClose()
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ width: "200px" }}
      >
        Add employee
      </Button>
      <Modal
        closeAfterTransition
        aria-describedby="transition-modal-description"
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={styles.modal_wrapper}>
              <h2>Add employee</h2>
              <form onSubmit={onSubmit}>
                <div className={styles.form_wrapper}>
                  <QuestionAnswerForm
                    change={onChange}
                    correctValue={correctValueInputs.id}   
                    name="id"
                    pressButtonState={pressButtonState}
                    question={questions.id}
                    value={data.id}
                  />
                  <QuestionAnswerForm
                    change={onChange}
                    correctValue={correctValueInputs.firstName}                
                    name="firstName"
                    pressButtonState={pressButtonState}
                    question={questions.firstName}
                    value={data.firstName}
                  />
                  <QuestionAnswerForm
                    change={onChange}
                    correctValue={correctValueInputs.lastName}                  
                    name="lastName"
                    pressButtonState={pressButtonState}
                    question={questions.lastName}
                    value={data.lastName}
                  />
                  <QuestionAnswerForm
                    change={onChange}
                    correctValue={correctValueInputs.email}                  
                    name="email"
                    pressButtonState={pressButtonState}
                    question={questions.email}
                    value={data.email}
                  />      
                </div>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
