import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListView from "./listView";
import { addChallenges, fetchChallenges } from "../../Store/challenges";
import FormContainer from "./formContainer";
import { v4 as uuidv4 } from "uuid";
import PreLoader from "../../Component/backDropLoader";
import CustomSnackBar from "../../Component/SnackBar";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Hooks/useAuth";
import { unwrapResult } from "@reduxjs/toolkit";

const initialChallenge = {
  title: "",
  description: "",
  tag: "",
  id: "",
  createdById: "",
  createdByName: "",
  vote: [],
};

const initialSnack = {
  openSnack: false,
  message: "",
  severity: "success",
};

const successAddSnack = {
  openSnack: true,
  message: "Succesfully Created Challenges",
  severity: "success",
};

const errorSnack = {
  openSnack: true,
  message: "Something went wrong",
  severity: "error",
};

function Challenge() {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    dispatch(fetchChallenges())
      .then(unwrapResult)
      .then(() => {
        setLoader(false);
      });
  }, []);

  const { userName, userId } = useAuth();

  const { challengeList } = useSelector((state) => state.challenges);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialChallenge);
  const [error, setError] = useState(false);
  const [snack, setSnack] = useState({
    openSnack: false,
    message: "",
    severity: "success",
  });
  const { openSnack, message, severity } = snack;

  const handleCloseSnack = () => {
    setSnack(initialSnack);
  };

  const handleReset = () => {
    setOpen(false);
    setFormData(initialChallenge);
    setError(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.tag) {
      const payload = {
        ...formData,
        id: uuidv4(),
        createdById: userId,
        createdByName: userName,
      };

      dispatch(addChallenges(payload))
        .then(unwrapResult)
        .then(() => {
          handleReset();
          setSnack(successAddSnack);
        })
        .catch(() => {
          setSnack(errorSnack);
        });
    } else {
      setError(true);
    }
  };

  return (
    <>
      <PreLoader open={loader} />
      <ListView rows={challengeList} handleAdd={handleAdd} />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Challenges</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create challenges, please enter the following details here.
          </DialogContentText>
          <FormContainer
            handleChange={handleChange}
            formData={formData}
            handleClose={handleClose}
            error={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackBar
        open={openSnack}
        message={message}
        severity={severity}
        handleClose={handleCloseSnack}
      />
    </>
  );
}

export default Challenge;
