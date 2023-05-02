import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import './Login.css';

//The input form for logging in. Does not require password authentication
const Login = props => {
  const [enteredName, setEnteredName] = useState('');

  const nameChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const submitUsernameHandler = event => {
    event.preventDefault();
    props.onLogin(enteredName);
  };

  //Has just a field to enter username and a login button
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
