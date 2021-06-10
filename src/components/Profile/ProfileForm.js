import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const newPasswordInputRef = useRef();

  const submitNewPasswordHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_NOT_SECRET_CODE}`, {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        history.replace('/');
      });
  };

  return (
    <form className={classes.form} onSubmit={submitNewPasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
