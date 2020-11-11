import { useState } from 'react';

import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import S from './SigninPage.module.scss';

export default function SigninPage() {
  const [signin, setSignin] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('oh ye');
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
