// storage

export const setNominees = (data) => {
  localStorage.setItem("nominees", JSON.stringify(data));
};

export const getNominees = () => {
  let nominees = localStorage.getItem("nominees");
  return JSON.parse(nominees);
};
//////

// debounce
export const debounce = (func, delay = 1000) => {
  let timeout;

  return (...args) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
