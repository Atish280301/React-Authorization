import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const EnteredEmail = emailInputRef.current.value;
    const EnteredPassword = passwordInputRef.current.value;

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
      ).then(res => {
        if(res.ok){
          //....
          return res.json().then(data => {
            console.log(data);
          })
        } else {
          return res.json().then (data => {
            //Show Error Modal
            console.log(data);
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
          <button>
            { isLogin ? 'Login' : 'Create Account' }
          </button>
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
