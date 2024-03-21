import { axiosReq } from "../api/axiosDefaults";
import jwtDecode from "jwt-decode"

export const fetchMoreData = async (resource, setResource) => {
  try {
    let url=new URL(resource.next)
    let correctUrl = resource.next.split(url.origin)[1]
    const temp = correctUrl.split('/').slice(2);
    correctUrl = `/${temp.join('/')}`;
    console.log('correctUrl',correctUrl)
    const { data } = await axiosReq.get(correctUrl);
    console.log(data);
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
    console.log(err)
  }
};

export const followHelper = (profile, clickedProfile, sender_id) => {
  return profile.id === clickedProfile.id
  ?
  // This is the profile I clicked on,
  // update its followers count and set its following id
  {
      ...profile,
      // follower_count : profile.follower_count + 1,
      sender_id
  }
  : profile.is_owner
  ?
  // This is the profile of logged in user
  // update its following count
  {
      ...profile,
      // following_count: profile.following_count + 1
  }
  :
  // this is not the profile the user clicked on or the profile
  // the user owns, so just return it unchanged
  profile
} 

export const unfollowHelper = (profile, clickedProfile, sender_id) => {
  return profile.id === clickedProfile.id
  ?
  // This is the profile I clicked on,
  // update its followers count and set its following id
  {
      ...profile,
      // follower_count : profile.follower_count - 1,
      sender_id
  }
  : profile.is_owner
  ?
  // This is the profile of logged in user
  // update its following count
  {
      ...profile,
      // following_count: profile.following_count - 1
  }
  :
  // this is not the profile the user clicked on or the profile
  // the user owns, so just return it unchanged
  profile
}

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
}

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};