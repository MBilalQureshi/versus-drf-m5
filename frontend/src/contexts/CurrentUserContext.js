import axios from "axios"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { axiosReq, axiosRes } from "../api/axiosDefaults"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

export const useCurrentUserContext = () => useContext(CurrentUserContext)
export const useSetCurrentUserContext = () => useContext(SetCurrentUserContext)

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)

    const handleMount = async () => {
        try{
            const {data} = await axiosRes.get('dj-rest-auth/user/')
            setCurrentUser(data)
        } catch(err){
            console.log(err.response?.data)
        }
    }

    useEffect(()=>{
        handleMount()
    },[])

    const history = useHistory()
    useMemo(()=> {
        // At the moment we don’t have any code  to use our request interceptor with,  
        // because we aren’t making any requests that need  it yet. But don’t worry, we will be using it soon.
          // request
          axiosReq.interceptors.request.use(
            async (config) => {
    
              /**
               * inside the CurrentUserContext file. Here, inside the request interceptor,
                we’ll put the entire try-catch block inside an if statement. The if-block will run only if the
                token should be refreshed, so we’ll auto-import the shouldRefreshToken function and call it.
               */
                try {
                  await axios.post("/dj-rest-auth/token/refresh/");
                } catch (err) {
                  setCurrentUser((prevCurrentUser) => {
                    if (prevCurrentUser) {
                      history.push("/signin");
                    }
                    return null;
                  });
                  return config;
                }
              return config;
            },
            (err) => {
              // incase error reject promise with it
              return Promise.reject(err);
            }
          );
    
          // response
          axiosRes.interceptors.response.use(
            // if no error return response
            (response) => response,
            // if there is error well check if its 401
            async(err) => {
              if(err.response?.status === 401){
                try{
                  // now try to refresh the access token
                  await axios.post('/dj-rest-auth/token/refresh/')
                } catch(err){
                  // if above refresh fails we'll redirect user to sign in page
                  setCurrentUser(prevCurrentUser => {
                    if(prevCurrentUser){
                      history.push('/signin')
                    }
                    // and set data to null
                    return null
                  })
                }
                // If there’s no error refreshing the token, I’ll return an axios instance with the  error config to exit the interceptor.
                return axios(err.config)
              }
              // In case the error wasn’t 401, I’ll just reject the  Promise with the error to exit the interceptor.
              return Promise.reject(err)
            }
          )
        // we shouldn’t forget to add a dependency  
        // array for our useMemo hook with history  inside. We want useMemo to only run once,  
        // but the linter will throw a warning if  we provided an empty dependency array.
        },[history])

    return(
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}