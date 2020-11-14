import { useState } from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import S from './SigninPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import userService from '../../services/userService';
import { signinUser, signupUser } from '../../reducers/userReducer';
import { Redirect } from 'react-router-dom';

export default function SigninPage() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => !!state.user);
  const [signin, setSignin] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (signin) {
      const userToSend = {
        username: e.target.username.value,
        password: e.target.password.value,
      };
      dispatch(signinUser(userToSend));
    } else {
      const userToSend = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        passwordRepeat: e.target.passwordRepeat.value,
      };
      if (userToSend.password !== userToSend.passwordRepeat) return;
      dispatch(signupUser(userToSend));
    }
  };

  return (
    <div className={S.signinPage}>
      {isSignedIn ? (
        <Redirect to="/" />
      ) : (
        <div className={S.formBox}>
          {signin ? (
            <SigninForm
              setSignin={setSignin}
              handleFormSubmit={handleFormSubmit}
            />
          ) : (
            <SignupForm
              setSignin={setSignin}
              handleFormSubmit={handleFormSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
}
