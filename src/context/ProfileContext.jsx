import { createContext, useState } from "react";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const currentCharacter = (profileData) => {
    setSelectedCharacter(profileData);
  };

  return (
    <ProfileContext.Provider
      value={{
        selectedCharacter,
        currentCharacter,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
export default ProfileProvider;
