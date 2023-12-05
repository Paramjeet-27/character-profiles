import styles from "./Header.module.css";
const Header = ({ pageName }) => {
  return (
    <>
      <p className={styles.header}>{pageName}</p>
    </>
  );
};
export default Header;
