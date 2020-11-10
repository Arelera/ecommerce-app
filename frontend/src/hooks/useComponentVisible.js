import { useEffect, useRef, useState } from 'react';

export default function useComponentVisible(initial) {
  const [isComponentsVisible, setIsComponentVisible] = useState(
    initial || false
  );
  const ref = useRef();

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  });

  return [ref, isComponentsVisible, setIsComponentVisible];
}
