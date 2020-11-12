import { useState } from 'react';
import S from './SigninForm.module.scss';

export default function SignupForm({ setSignin, handleFormSubmit }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  return (
    <form onSubmit={handleFormSubmit} className={S.form}>
      <h2>Sign up</h2>
      <label>
        <p>Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          minLength="3"
          required
        />
      </label>
      <label>
        <p>Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          required
        />
      </label>
      <label>
        <p>Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          minLength="8"
          maxLength="50"
          required
        />
      </label>
      <label>
        <p>Password repeat</p>
        <input
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          type="password"
          name="passwordRepeat"
          minLength="8"
          maxLength="50"
          required
        />
      </label>
      <button type="submit">Sign in</button>
      <div className={S.signupLink}>
        <button type="button" onClick={() => setSignin(true)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
