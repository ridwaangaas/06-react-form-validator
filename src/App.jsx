//import { useState } from 'react';

import { useImmer } from "use-immer";
import * as EmailValidator from 'email-validator';
import './app.scss'

let validate = false;

function App() {

  const [state, setState] = useImmer({
    user: '',
    password: '',
    confirmPassword: '',
    showPassword: false, 
    showInvalidEmail: false, 
    isPasswordShort: false,
    passwordMatch: false,
    passwordStrength: {
      color: '',
      value: ''
    }
  });

  const validate = (
    state.email
    && !state.showInvalidEmail
    && state.password.length > 8
    && state.passwordStrength.value === 'strong'
    && state.password === state.confirmPassword

  )

  return (
   <div id="app">
    <form
    id="my-form" 
    className="shadow">

      <h4>Form Validator</h4>

      <div className="mb-4">
        <label>Email</label>
        <input 
        className="form-control" 
        type="text" 
        data-rules="required|digits:5|min:5"
        placeholder="please put your email"
        value={state.email || ''}
          onChange={(event) => {
            setState((draft) => {
              draft.email = event.target.value;
            });
          // setState({
          //   user: event.target.value
          // })
        }}
         />
      </div>
      <div className="mb-4">
        <label>Password</label>
        <input className="form-control" 
        // type="password" 
        type={state.showPassword ? 'text': 'password'}
        data-rules="required|string|min:5" 
        value={state.password || ''}
       onChange={(event) => {
            setState((draft) => {
              draft.password = event.target.value;
            });
          }}
        />
      </div>
      <div className="mb-4">
        <label>Password Confirm</label>
        <input 
        className="form-control" 
        type="password" 
        data-rules="required|string|min:5"
           value={state.confirmPassword || ''}
            onChange={(event) => {
            setState((draft) => {
              draft.confirmPassword = event.target.value;
            });
          }}
           
           />
           {
            state.showInvalidEmail && <p class='validator-err'> Email is not valid, please make sure you put correct email address</p>
           }
        </div>
      <button
      disabled={!validate}
      style={{
        backgroundColor: validate ? '': 'gray'
      }}
      >CREATE USER</button>
    </form>
  </div>

  );
}

export default App;
