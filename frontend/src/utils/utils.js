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