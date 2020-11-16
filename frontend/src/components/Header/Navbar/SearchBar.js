import S from './SearchBar.module.scss';
import { useState } from 'react';
import searchsvg from './svg/search-solid.svg';
import { useDispatch } from 'react-redux';
import { getByQuery } from '../../../reducers/productsReducer';
import { useHistory, useLocation } from 'react-router-dom';

export default function SearchBar() {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?query=${query}`);
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

const useQuery = () => new URLSearchParams(useLocation().search);
