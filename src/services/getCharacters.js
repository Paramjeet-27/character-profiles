const BASE_URL = "https://rickandmortyapi.com/api";

export const searchCharacters = (name) => {
  return fetch(`${BASE_URL}/character/?name=${name}`).then((res) => res.json());
};

export const fetchCharactersOnPage = (pageNumber) => {
  return fetch(`${BASE_URL}/character/?page=${pageNumber}`).then((res) =>
    res.json()
  );
};
