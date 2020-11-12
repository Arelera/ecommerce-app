import S from './SigninForm.module.scss';

export default function SignupForm({ setSignin }) {
  return (
    <form className={S.form}>
      <h2>Sign up</h2>
      <label>
        <p>Email</p>
        <input type="email" name="email" required />
      </label>
      <label>
        <p>Password</p>
        <input type="password" name="password" required />
      </label>
      <label>
        <p>Password repeat</p>
        <input type="password" name="passwordrepeat" required />
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
