import S from './SearchBar.module.scss';
import searchsvg from '../../../svg/search-solid.svg';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SearchBar() {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.value) {
      history.push(`/search?query=${query}`);
    }
  };

  return (
    <form className={S.form} onSubmit={handleSubmit}>
      <input
        className={S.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a product"
      />
      <button className={S.button} type="submit">
        <img src={searchsvg} alt="" />
      </button>
    </form>
  );
}
