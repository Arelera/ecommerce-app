import S from './SearchBar.module.scss';
import { useState } from 'react';
import searchsvg from './svg/search-solid.svg';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <form className={S.form} onSubmit={handleSubmit}>
      <input
        className={S.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={S.button} type="submit">
        <img src={searchsvg} alt="" />
      </button>
    </form>
  );
}
