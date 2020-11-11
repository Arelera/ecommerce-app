import S from './SigninForm.module.scss';

export default function SigninForm({ handleFormSubmit, setSignin }) {
  return (
    <form onSubmit={handleFormSubmit} className={S.form}>
      <h2>Sign in</h2>
      <label>
        <p>Email</p>
        <input type="email" name="email" required />
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
