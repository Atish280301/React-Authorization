import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, SetIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const EnteredEmail = emailInputRef.current.value;
    const EnteredPassword = passwordInputRef.current.value;

    SetIsLoading(true);
    if(isLogin) {

    } else {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXIcW9GzBV7V6fjJxeMwJEP-_TnRcP4CA` ,
        {
          method: 'POST',
          body: JSON.stringify({
            email: EnteredEmail,
            password: EnteredPassword,
            returnSecureToken: true
          }),
          headers: {'Content-Type': 'application/json'}
        }
      ).then((res) => {
        SetIsLoading(false);
        if(res.ok){
          //....
          return res.json().then(data => {
            console.log(data);
          })
        } else {
          return res.json().then (data => {
            let errorMessage = "Authentication Failed";
            if(data && data.error && data.error.message){
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      });
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {
            !isLoading && 
            <button>
            { isLogin ? 'Login' : 'Create Account' }
          </button>
          }
          {
            isLoading && <p>Sending Request....</p>
          }
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
