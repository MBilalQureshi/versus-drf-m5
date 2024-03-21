import Container from 'react-bootstrap/Container'
import appStyles from '../../App.module.css'
import Asset from '../../components/Asset'
import Profile from './Profile'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'

const FriendsProfiles = ({ mobile }) => {
    const [friendsProfiles, setFriendsProfiles] = useState([]);
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get("/friends/");
                setFriendsProfiles(data.results);
                console.log(data)
            } catch (err) {
                console.log(err);
            }
            
        };
        
        handleMount();
    }, [currentUser]);

    return (
        <Container
          className={`${appStyles.Content} ${
            mobile && "d-lg-none text-center mb-3"
          }`}
        >
          {friendsProfiles.length ? (
            <>
              <p>Most up voted profiles.</p>
              {mobile ? (
                <div className="d-flex justify-content-around">
                    {/* for mobile */}
                  {friendsProfiles.slice(0, 4).map((profile) => (
                    <Profile key={profile.id} profile={profile} mobile />
                  ))}
                </div>
              ) : (
                // for desktop
                friendsProfiles.map((profile) => (
                    <Profile key={profile.id} profile={profile} />
                ))
              )}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      );
    };

export default FriendsProfiles;
