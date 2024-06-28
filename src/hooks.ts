import { useEffect, useState } from "react";


export const useDebounce = <T,>(value: T, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // console.log('Debounce hook: setting timeout');
    const timeout = setTimeout(() => {
    //   console.log('Debounce hook: setting debounce value', value);
      setDebounceValue(value);
    }, delay);

    return () => {
    //   console.log('Debounce hook: clearing timeout');
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceValue;
};

