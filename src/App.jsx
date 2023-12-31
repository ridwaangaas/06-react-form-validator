//import { useState } from 'react';

import { useImmer } from "use-immer";
import * as EmailValidator from 'email-validator';
import { passwordStrength } from 'check-password-strength';
import './app.scss'

// let validate = false;

const initialState ={

    email: '',
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
  };

function App() {

  const [state, setState] = useImmer(initialState);

  const validate = (
    state.email
    && !state.showInvalidEmail
    && state.password.length > 8
    && ['Strong', 'Medium'].includes(state.passwordStrength.value)
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
        placeholder="Email required"
        value={state.email || ''}
          onChange={(event) => {
            setState((draft) => {
              draft.email = event.target.value;
            });
          // setState({
          //   user: event.target.value
          // })
        }}
           onBlur={() => {
            setState((draft) => {
draft.showInvalidEmail = !EmailValidator.validate(state?.email)
            })
         
           }}
         />
         { state.showInvalidEmail
           && <p className="validator-err">please input a valid email </p>
         }

      </div>
      <div className="mb-4"
      style={{
        position: 'relative'
      }}
      >
        <label>Password</label>
        <input className="form-control" 
        type={state.showPassword ? 'text': 'password'}
        placeholder="Password required"
        data-rules="required|string|min:5" 
        value={state.password || ''}
       onChange={(event) => {
            setState((draft) => {
              draft.password = event.target.value;

              if (event.target.value.length > 8){
                const passwordStrengthValue = passwordStrength(event.target.value).value
                // console.log(passwordStrengthValue);
                draft.passwordStrength.value = passwordStrengthValue;
                switch(passwordStrengthValue) {
  case 'Too Weak':
    draft.passwordStrength.color = 'red';
    break;
  case 'Weak':
   draft.passwordStrength.color = 'Orange';
   break;
    case 'Medium':
   draft.passwordStrength.color = 'blue';
    break;
  default:
   draft.passwordStrength.color = 'green';
}
                
                 draft.isPasswordShort = false;
              } else {
                 draft.passwordStrength.value = '';
                  draft.passwordStrength.color = '';
              }
            });
          }}
             onBlur={() => {
            setState((draft) => {
draft.isPasswordShort = state.password.length < 8;
            });
         
           }}
        />
         { state.isPasswordShort
           && <p className="validator-err">Password must at least 8 characters </p>
         }

         {
          state.password && <button
          style={{
            position: 'absolute',
            top: 25,
            right: 10,
            width: 50,
            padding: '0px !important',
            margin: '0',
            fontSize: '0.5em',
            border: 'none !important',
          }}
          type='button'
          onClick={() => {
            setState((draft) => {
              draft.showPassword = !draft.showPassword;
              if (!state.showPassword) {
                draft.confirmPassword = state.password;
                draft.passwordMatch = true;
                
              }
              else {
                draft.passwordMatch = false;
                draft.confirmPassword = ''
              }
            });
          }}
          >see/hide</button>
         } 
      </div>
{
  !state.showPassword
   &&
      <div className="mb-4">
        <label>Password Confirm</label>
        <input 
        className="form-control" 
        type="password" 
        data-rules="required|string|min:5"
        placeholder="Confirm password"
           value={state.confirmPassword || ''}
            onChange={(event) => {
            setState((draft) => {
              draft.confirmPassword = event.target.value;
              draft.passwordMatch = event.target.value === state.password
            });
          }}

           />
         
        </div>
}
{
  !state.passwordMatch 
  && state.confirmPassword
  && <p className="validator-err">passwords must match</p>
}
            {
              state.passwordStrength.value
              && <div className="mb-4"
      style={{
        position: 'relative', 
        color: state.passwordStrength.color
      }}
      >
        {state.passwordStrength.value}
      </div>
            }    
        

      <button
      disabled={!validate}
      style={{
        backgroundColor: validate ? '': 'gray'
      }}
      onClick={() => {
        alert("Congratulations! Your form is validated and we're creating the user for you")
          setState(initialState);
        
      }}
type="button"

      >
        CREATE EMAIL
        </button>
    </form>
  </div>

  );
}

export default App;
