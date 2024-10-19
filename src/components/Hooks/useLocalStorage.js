import { useEffect, useState } from "react";

export function useLocalStorage(key, initialData) {
  useEffect(() => {
    const existingLocalData = JSON.parse(localStorage.getItem(key));
    if (existingLocalData) {
      setData(existingLocalData);
    } else {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  }, []);

  const [data, setData] = useState(initialData);
  const updateLocalStorage = (newData) => {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
    }
    setData(newData);
  }; 

  return [data, updateLocalStorage];
}
