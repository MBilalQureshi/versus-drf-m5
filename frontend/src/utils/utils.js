import { axiosReq } from "../api/axiosDefaults";
import jwtDecode from "jwt-decode";

// This component fetch more paginated data
export const fetchMoreData = async (resource, setResource) => {
  try {
    let url = new URL(resource.next);
    let correctUrl = resource.next.split(url.origin)[1];
    const temp = correctUrl.split("/").slice(2);
    correctUrl = `/${temp.join("/")}`;
    const { data } = await axiosReq.get(correctUrl);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err);
  }
};

// Add new friend helper function
export const addFriendHelper = (profile, clickedProfile, sender_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        sender_id,
      }
    : profile.is_owner
    ? {
        ...profile,
      }
    : profile;
};

// Remove friend helper function
export const removeFriendHelper = (profile, clickedProfile, sender_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        sender_id,
      }
    : profile.is_owner
    ? {
        ...profile,
      }
    : profile;
};

// Function to set the expiration timestamp of the refresh token in the local storage.
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Function to check whether there is a stored refresh token timestamp in the local storage.
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

// Function to remove the refresh token timestamp from the local storage.
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
