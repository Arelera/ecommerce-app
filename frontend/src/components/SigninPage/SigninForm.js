import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import S from './SigninForm.module.scss';

export default function SigninForm({ handleFormSubmit, setSignin }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, 5000);
    return () => clearTimeout(id);
  }, [user]);

  return (
    <form onSubmit={handleFormSubmit} className={S.form}>
      <h2>Sign in</h2>
      {user?.error && <h3>Invalid credentials</h3>}
      <label onSubmit={handleFormSubmit}>
        <p>Username</p>
        <input type="text" name="username" required />
      </label>
      <label>
        <p>Password</p>
        <input type="password" name="password" required />
      </label>
      <button type="submit">Sign in</button>
      <div className={S.signupLink}>
        <button type="button" onClick={() => setSignin(false)}>
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );
}
