import { Route, Routes } from "react-router-dom";
import CharactersPage from "../pages/CharactersPage/CharactersPage";
import routes from "./routes.json";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<CharactersPage />} />
      <Route path={routes.CHARACTERS} element={<CharactersPage />} />
      <Route path={routes.PROFILE} element={<ProfilePage />} />
    </Routes>
  );
};
export default PageRoutes;
