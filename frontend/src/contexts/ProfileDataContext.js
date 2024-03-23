import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { addFriendHelper, removeFriendHelper } from "../utils/utils";

// Create context so that profile informaion could be stored
const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

// These hooks are to access the profile data and set current profile context
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

// This component handles the profile data state
export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  // This allows access to current user from CurrentUserContext
  const currentUser = useCurrentUser();

  // Fetches popular profiles based on highest to lowest number of votes
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-total_upvotes"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    // Runs when program initilizes and handle mount function
    handleMount();
  }, [currentUser]);

  // This function handles adding friend
  const handleAddFriend = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/friends/", {
        request: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            addFriendHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            addFriendHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // This function handles removing friend
  const handleRemoveFriend = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/friends/${clickedProfile.sender_id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            removeFriendHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            removeFriendHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleAddFriend, handleRemoveFriend }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
