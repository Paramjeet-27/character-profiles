import styles from "./ProfileCard.module.css";
import Button from "react-bootstrap/Button";

const ProfileCard = ({
  name,
  species,
  status,
  gender,
  location,
  avatar,
  onDetailsClickHandler,
}) => {
  return (
    <>
      <div className={styles.card}>
        <div
          className={styles.avatar}
          style={{
            backgroundImage: `url("${avatar}")`,
          }}
        ></div>
        <div className={styles.descriptionBox}>
          <div className={styles.heading}>{name}</div>
          <div className={styles.description}>
            <p className={styles.species}>{`(${species})`}</p>
            <p className={styles.cardDescription}>
              <b>Status: </b> {status}
            </p>
            <p className={styles.cardDescription}>
              <b>Gender: </b> {gender}
            </p>
            <p className={styles.cardDescription}>
              <b>Location: </b> {location}
            </p>
          </div>
          <div className={styles.detailsButton}>
            <Button variant="primary" onClick={onDetailsClickHandler}>
              View Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileCard;
