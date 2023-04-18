import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import './Login.css';

const Login = props => {
  const [enteredName, setEnteredName] = useState('');

  const nameChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const submitUsernameHandler = event => {
    event.preventDefault();
    console.log("logging in");
    props.onLogin(enteredName);
  };

  return (
    <section id="login">
      <form onSubmit={submitUsernameHandler}>
        <Input
          type="text"
          label="Username"
          id="title"
          value={enteredName}
          onChange={nameChangeHandler}
        />
        <Button type="submit">Log in</Button>
      </form>
    </section>
  );
};

export default Login;
