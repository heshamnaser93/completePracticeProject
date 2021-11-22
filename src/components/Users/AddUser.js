import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "./../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const entered_name = nameInputRef.current.value;
    const entered_age = ageInputRef.current.value;

    if (entered_name.trim().length === 0 || entered_age.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values)",
      });
      return;
    } else if (+entered_age < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (age > 0)",
      });
      return;
    }

    props.onAddingUser(entered_name, entered_age);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age(Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
