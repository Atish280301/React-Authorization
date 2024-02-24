import AuthContext from '../../Store/AuthContext';
import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();

  const AuthCtx = useContext(AuthContext); // Move useContext here

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAXIcW9GzBV7V6fjJxeMwJEP-_TnRcP4CA`, {
      method: 'POST',
      body: JSON.stringify({
        idToken: AuthCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      //Assumption Always Succeeds!
      history.replace('/');
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="4" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;