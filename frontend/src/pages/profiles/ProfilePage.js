import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

// This component sets profile of user and posts
function ProfilePage() {
  // Set loader state as false
  const [hasLoaded, setHasLoaded] = useState(false);

  // Set profile posts state
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  // Fetch current user from CurrentUserContext
  const currentUser = useCurrentUser();

  // Fetches id from URL
  const { id } = useParams();

  // Fetch user profile from ProfileDataContext
  const { pageProfile } = useProfileData();

  // Fetch pages profile result
  const [profile] = pageProfile.results;

  // Check if logged in user is also profile owner
  const is_owner = currentUser?.username === profile?.owner;

  // Destructure useSetProfileData to set it to new values as per every profile
  const { setProfileData, handleAddFriend, handleRemoveFriend } = useSetProfileData();

  // Fetch and set profile and posts based on user id 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(
              `/products/posts/?vote__owner__profile=&owner__profile=${id}`
            ),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  // Fetch and set profile and posts based on user id 
  const fetchDataRequest = async () => {
    try {
      const [{ data: pageProfile }, { data: profilePosts }] = await Promise.all(
        [
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(
            `/products/posts/?vote__owner__profile=&owner__profile=${id}`
          ),
        ]
      );
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: { results: [pageProfile] },
      }));
      setProfilePosts(profilePosts);
      setHasLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Add friend click handler
  const handleAddFriendClick = () => {
    handleAddFriend(profile);
    fetchDataRequest();
  };

  // Remove friend click handler
  const handleRemoveFriendClick = () => {
    handleRemoveFriend(profile);
    fetchDataRequest();
  };

  // JSX for profile
  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
            alt={`${profile?.owner}'s Avatar`}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2 text-lg-center">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>
                {!profile?.total_up_votes_received
                  ? 0
                  : profile?.total_up_votes_received}
              </div>
              <div>Up votes</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>
                {!profile?.total_down_votes_received
                  ? 0
                  : profile?.total_down_votes_received}
              </div>
              <div>Down Votes</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.sender_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleRemoveFriendClick()}
              >
                Remove Friend
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleAddFriendClick()}
              >
                Add Friend
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
