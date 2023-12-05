import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Header from "../../components/Header/Header";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import styles from "./CharactersPage.module.css";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes.json";
import { ProfileContext } from "../../context/ProfileContext";
import PaginationBar from "../../components/PaginationBar/Paginationbar";
import {
  fetchCharactersOnPage,
  searchCharacters,
} from "../../services/getCharacters";

const CharactersPage = () => {
  // Declating useState to store the data.
  const [characters, setCharacters] = useState([]);
  const [initialCharacters, setInitialCharacters] = useState([]);
  const [currentLocations, setCurrentLocations] = useState([]);
  const [currentSpecies, setCurrentSpecies] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Making API call to fetch all the characters and storing the respective data
  useEffect(() => {
    onPageClickHandler(currentPage);
    // fetchCharacters().then((data) => {
    //   setCharacters(data.results);
    //   setInitialCharacters(data.results);
    //   console.log(data.info);
    //   setInfoData(data.info);

    //   // Making unique array of all the locations in current page
    //   const locationArray = data.results.map((ele) => ele.location.name);
    //   const uniqeLocations = Array.from(new Set(locationArray));
    //   setCurrentLocations(uniqeLocations);

    //   // Making uniquw array of all the species in the current page
    //   const speciesArray = data.results.map((ele) => ele.species);
    //   const uniqeSpecies = Array.from(new Set(speciesArray));
    //   setCurrentSpecies(uniqeSpecies);
    // });
  }, []);

  // Options that will be visible in Locations Filter Dropdown
  const locationFilter = currentLocations.map((ele, index) => (
    <option key={index} value={ele}>
      {ele}
    </option>
  ));

  // Options that will be visible in the Species Filter Dropdown
  const speciesFilter = currentSpecies.map((ele, index) => (
    <option key={index} value={ele}>
      {ele}
    </option>
  ));

  // Updating the context API on click of the View Details Buttons and Navigating to the Profiles Page.
  const { currentCharacter, currentPage, setCurrentPage } =
    useContext(ProfileContext);
  const navigate = useNavigate();

  const detailsClickHandler = (index) => {
    currentCharacter(characters[index]);
    navigate(routes.PROFILE);
  };

  // Search Functionality that works on the click of Search Button and API calling
  const onSearchFieldChangeHandler = (e) => setSearchValue(e.target.value);

  const onSearchBtnHandler = () => {
    console.log(searchValue);
    searchCharacters(searchValue).then((data) => setCharacters(data.results));
  };

  // Status Filter
  const statusFilterChangeHandler = (e) => {
    console.log(e.target.value);
    const charactersCopy = [...initialCharacters];
    const filteredArray = charactersCopy.filter(
      (ele) => ele.status === e.target.value
    );
    setCharacters(filteredArray);
  };

  // Gender Filter
  const genderFilterChangeHandler = (e) => {
    const charactersCopy = [...initialCharacters];
    const filteredArray = charactersCopy.filter(
      (ele) => ele.gender === e.target.value
    );
    setCharacters(filteredArray);
  };

  // Location Filter
  const locationFilterChangeHandler = (e) => {
    const charactersCopy = [...initialCharacters];
    const filteredArray = charactersCopy.filter(
      (ele) => ele.location.name === e.target.value
    );
    setCharacters(filteredArray);
  };

  // Species Filter
  const speciesFilterChangeHandler = (e) => {
    const charactersCopy = [...initialCharacters];
    const filteredArray = charactersCopy.filter(
      (ele) => ele.species === e.target.value
    );
    setCharacters(filteredArray);
  };

  // Clearing all filters
  const onClearFilterhandler = () => {
    setCharacters(initialCharacters);
  };

  // Viewing all Characters on current page fetched through API
  const charactersView = characters.map((ele, index) => (
    <ProfileCard
      key={index}
      name={ele.name}
      species={ele.species}
      gender={ele.gender}
      status={ele.status}
      location={ele.location.name}
      avatar={ele.image}
      onDetailsClickHandler={() => detailsClickHandler(index)}
    />
  ));

  const onPageClickHandler = (pageNumber) => {
    fetchCharactersOnPage(pageNumber).then((data) => {
      setCharacters(data.results);
      setInitialCharacters(data.results);
      console.log(data.info);
      setInfoData(data.info);

      // Making unique array of all the locations in current page
      const locationArray = data.results.map((ele) => ele.location.name);
      const uniqeLocations = Array.from(new Set(locationArray));
      setCurrentLocations(uniqeLocations);

      // Making uniquw array of all the species in the current page
      const speciesArray = data.results.map((ele) => ele.species);
      const uniqeSpecies = Array.from(new Set(speciesArray));
      setCurrentSpecies(uniqeSpecies);
    });
  };

  return (
    <>
      <Header pageName="Characters Page" />
      <div className={styles.searchSection}>
        <input
          type="text"
          name="searchBar"
          placeholder="Search By Characters"
          className={styles.searchBar}
          onChange={onSearchFieldChangeHandler}
        />
        <Button variant="primary" size="small" onClick={onSearchBtnHandler}>
          Search
        </Button>
      </div>
      <div className={styles.filterSection}>
        <span className={styles.filterText}>Filters: </span>
        <select
          className={styles.filters}
          name="statusFilter"
          onChange={statusFilterChangeHandler}
        >
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          className={styles.filters}
          name="speciesFilter"
          onChange={speciesFilterChangeHandler}
        >
          {speciesFilter}
        </select>
        <select
          className={styles.filters}
          name="genderFilter"
          onChange={genderFilterChangeHandler}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Gender Less</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          className={styles.filters}
          name="locationFilter"
          onChange={locationFilterChangeHandler}
        >
          {locationFilter}
        </select>
        <span className={styles.clearFilterBtn}>
          <Button variant="primary" size="small" onClick={onClearFilterhandler}>
            Clear Filters
          </Button>
        </span>
      </div>
      <div className={styles.charactersContainers}>{charactersView}</div>
      <div className={styles.pagination}>
        <PaginationBar
          totalPages={infoData.pages}
          currentPage={currentPage}
          onFirstclickHandler={() => {
            onPageClickHandler(1);
            setCurrentPage(1);
          }}
          onPrevClickHandler={() => {
            onPageClickHandler(currentPage - 1);
            setCurrentPage(currentPage - 1);
          }}
          onNextClickHandler={() => {
            onPageClickHandler(currentPage + 1);
            setCurrentPage(currentPage + 1);
          }}
          onLastClickHandler={() => {
            onPageClickHandler(infoData.pages);
            setCurrentPage(infoData.pages);
          }}
        />
      </div>
    </>
  );
};

export default CharactersPage;
