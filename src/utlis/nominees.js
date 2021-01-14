export const setNominees = (data) => {
  localStorage.setItem("nominees", JSON.stringify(data));
};

export const getNominees = () => {
  let nominees = localStorage.getItem("nominees");
  return JSON.parse(nominees);
};
