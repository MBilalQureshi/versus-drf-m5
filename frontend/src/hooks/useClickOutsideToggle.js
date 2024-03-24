import { useEffect, useRef, useState } from 'react'

const useClickOutsideToggle = () => {
    // State set if navbar is expanded or not
    const [expanded,setExpanded] = useState(false)

    //This will hold reference to burger icon
    const ref = useRef(false);

    // On page load add mouse up event to check if user clicked out side nav
    useEffect(()=>{
        const handleClickOutside = (event) =>{
            if(ref.current && !ref.current.contains(event.target)){
                setExpanded(false)
            }
        }
        document.addEventListener('mouseup',handleClickOutside)
        return () =>{
            document.removeEventListener('mouseup',handleClickOutside)
        }
    },[ref])
  return {expanded, setExpanded, ref}
}

export default useClickOutsideToggle