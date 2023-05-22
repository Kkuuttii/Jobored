import { useState } from 'react';

export const useLocalStorage = <K>(key: string, initialValue?: K) => {
  
const [item, setItem] = useState<K>(() => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : initialValue;
});

const setItemToLocalStorage = (newValue: K) => {
  setItem(newValue);
  localStorage.setItem(key, JSON.stringify(newValue));
};

return {
  item, 
  setItemToLocalStorage
};
}