import { useState } from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import S from './SigninPage.module.scss';

import userService from '../../services/userService';

export default function SigninPage() {
  const [signin, setSignin] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (signin) {
      const userToSend = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
    } else {
      const userToSend = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        passwordRepeat: e.target.passwordRepeat.value,
      };
      if (userToSend.password !== userToSend.passwordRepeat) return;
      userService.signupUser(userToSend).then((res) => {
        window.localStorage.setItem('user', res);
        // do some more stuff here maybe
      });
    }
  };

  return (
    <div className={S.signinPage}>
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
    </div>
  );
}
