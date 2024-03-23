import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Button from "react-bootstrap/Button";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

// This component set the profile page 
const Profile = (props) => {
  // Destructring the props
  const { profile, mobile, imageSize = 55 } = props;

  // Destructring the profile
  const { id, sender_id, image, owner } = profile;

  // Fetch current user from CurrentUserContext
  const currentUser = useCurrentUser();

  // Check if logged in user is profile owner
  const is_owner = currentUser?.username === owner;

  // Fetch handlers for adding and removing friends from ProfileDataContext
  const { handleAddFriend, handleRemoveFriend } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link to={`/profiles/${id}`} className="align-self-center">
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>

      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (sender_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleRemoveFriend(profile)}
            >
              Remove Friend
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleAddFriend(profile)}
            >
              Add Friend
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
