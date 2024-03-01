import axios from "axios"
import { createContext, useContext, useEffect } from "react"

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

export const useCurrentUserContext = () => useContext(CurrentUserContext)
export const useSetCurrentUserContext = () => useContext(SetCurrentUserContext)

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)

    const handleMount = async () => {
        try{
            const {data} = await axios.get('dj-rest-auth/user/')
            setCurrentUser(data)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        handleMount()
    },[])

    return(
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext>
                {children}
            </SetCurrentUserContext>
        </CurrentUserContext.Provider>
    )
}