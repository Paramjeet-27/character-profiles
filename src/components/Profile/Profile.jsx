import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "./Profile.module.css";
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes.json";

const Profile = () => {
  // Declating States to store Data
  const [originDetails, setOriginDetails] = useState({});
  const [locationDetails, setLocationDetails] = useState({});
  const [originPopulation, setOriginPopulation] = useState(0);
  const [locationPopulation, setLocationPopulation] = useState(0);
  const [episodes, setEpisodes] = useState([]);

  // Fetching data from Context-API
  const { selectedCharacter } = useContext(ProfileContext);

  // Fetching origin location details
  const fetchOriginLocation = async () => {
    const location = await fetch(`${selectedCharacter.origin.url}`);
    location.json().then((data) => {
      setOriginPopulation(data.residents.length);
      setOriginDetails(data);
    });
  };

  // Fetching current location details
  const fetchCurrentLocation = async () => {
    const location = await fetch(`${selectedCharacter.location.url}`);
    location.json().then((data) => {
      setLocationPopulation(data.residents.length);
      setLocationDetails(data);
    });
  };

  // Mapping Episodes names to show dynamically
  const mapingEpisodes = async () => {
    const urlArray = selectedCharacter.episode;
    const episodeList = await Promise.all(
      urlArray.map(async (url) => {
        const response = await fetch(`${url}`);
        return await response.json();
      })
    );
    setEpisodes(episodeList);
  };
  const episosdesDisplay = episodes.map((ele, index) => (
    <span className={styles.episodesDisplay} key={index}>
      {ele.name}
    </span>
  ));

  // Storing Data in renderind of this component
  useEffect(() => {
    fetchOriginLocation();
    fetchCurrentLocation();
    mapingEpisodes();
  }, []);

  // Navigating to all characters page
  const navigate = useNavigate();
  const backBtnHandler = () => navigate(routes.CHARACTERS);

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.avatar}
          style={{
            backgroundImage: `url("${selectedCharacter.image}")`,
          }}
        ></div>
        <div className={styles.characterName}>
          {selectedCharacter.name.toUpperCase()}
        </div>
        <div className={styles.characterDetails}>
          <p>
            <b>Species:</b> {selectedCharacter.species}
          </p>
          <p>
            <b>Status:</b> {selectedCharacter.status}
          </p>
          <p>
            <b>Gender:</b> {selectedCharacter.gender}
          </p>
          <p>
            <b>Type:</b>
            {` `}
            {!selectedCharacter.type ? `Unknown` : selectedCharacter.type}
          </p>
        </div>
        <div className={styles.characterLocation}>
          <div className={styles.originLocation}>
            <h5>Origin Location</h5>
            <p>
              <b>Name: </b>
              {originDetails.name}
            </p>
            <p>
              <b>Dimension: </b>
              {originDetails.dimension}
            </p>
            <p>
              <b>Type: </b>
              {originDetails.type}
            </p>
            <p>
              <b>Population: </b>
              {originPopulation}
            </p>
          </div>
          <div className={styles.currentLocation}>
            <h5>Current Location</h5>
            <p>
              <b>Name: </b>
              {locationDetails.name}
            </p>
            <p>
              <b>Dimension: </b>
              {locationDetails.dimension}
            </p>
            <p>
              <b>Type: </b>
              {locationDetails.type}
            </p>
            <p>
              <b>Population: </b>
              {locationPopulation}
            </p>
          </div>
        </div>
        <div className={styles.episodes}>
          <h5>{`${selectedCharacter.name} appeared in....`}</h5>
          <p className={styles.episodeList}>{episosdesDisplay}</p>
        </div>
      </div>
      <div className={styles.backButton}>
        <Button variant="primary" onClick={backBtnHandler}>
          Back to All Characters
        </Button>
      </div>
    </>
  );
};
export default Profile;
