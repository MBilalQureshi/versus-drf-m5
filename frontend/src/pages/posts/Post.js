import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";

const Post = (props) => {
    const {id, owner, category, category_name, content, created_at, down_vote_id,
    image, profile_id, profile_image, title, up_vote_id, updated_at,PostPage,setPosts} = props
    
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner
    const history = useHistory()
    const handleEdit = () => {
      history.push(`/posts/${id}/edit`)
    }
    const handleUpVote = async () => {
      try{
        const postData = {
          product: id, // Assuming you have product object passed as a prop
          up_vote:  true,
          down_vote: false, // Set to false as it's an upvote
        };
        await axiosRes.post('/votes/', postData)
      }catch(err){
        console.log(err)
      }
    }
  
    const handleDelete = async () => {
      try{
        let vote_id = 0
        if (up_vote_id === null){
          vote_id = down_vote_id          
        }else{
          vote_id = up_vote_id
        }
        await axiosRes.delete(`/votes/${vote_id}/`)
      }catch(err){
        console.log(err)
      }
    }
    const handleDownVote = async () => {
      try{
        const postData = {
          product: id,
          up_vote:  false,
          down_vote: true,
        };
        await axiosRes.post('/votes/', postData)
      }catch(err){
        console.log(err)
      }
    }

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && PostPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        {category_name && <Card.Text>Selected post category is "{category_name}"</Card.Text>}
        <span className={`mr-5 ${styles.PostBar}`}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't vote on your own post!</Tooltip>}
            >
              <i className="fa-solid fa-arrow-up-long" />
            </OverlayTrigger>
          ) : up_vote_id && !down_vote_id ? (

            <span onClick={() => {}}>
              <i className={`fa-solid fa-arrow-up-long ${styles.Heart}`} />
            </span>
          ) : currentUser && !up_vote_id && !down_vote_id ? (
            // have not up voted yet
            <span onClick={handleUpVote} value="upVote">
              <i className={`fa-solid fa-arrow-up-long ${styles.HeartOutline}`} />
            </span>
          ) : !up_vote_id && down_vote_id ? (
            // already upvoted
            <span>
              <i className="fa-solid fa-arrow-up-long" />
            </span>
          ): (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to vote on posts!</Tooltip>}
            >
              <i className="fa-solid fa-arrow-up-long" />
            </OverlayTrigger>
          )}
          

        </span>

        <span className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't vote on your own post!</Tooltip>}
            >
              <i className="fa-solid fa-xmark" />
            </OverlayTrigger>
          ) : up_vote_id  || down_vote_id ? (
            <span onClick={handleDelete}>
              Remove vote<i className={`fa-solid fa-xmark`} />{/** ${styles.Heart} */}
            </span>
          ) : !up_vote_id  || !down_vote_id ? (
            <span>
              Remove vote<i className={`fa-solid fa-xmark`} />{/** ${styles.Heart} */}
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to remove vote!</Tooltip>}
            >
              <i className="fa-solid fa-xmark" />
            </OverlayTrigger>
          )}
          

        </span>

        <span className={`ml-5 ${styles.PostBar}`}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't vote on your own post!</Tooltip>}
            >
              <i className="fa-solid fa-arrow-down-long" />
            </OverlayTrigger>
          ) : down_vote_id && !up_vote_id ? (
            <span onClick={() => {}}>
              <i className={`fa-solid fa-arrow-down-long ${styles.Heart}`} />
            </span>
          ) : currentUser && ! down_vote_id && !up_vote_id? (
            <span onClick={handleDownVote}>
              <i className={`fa-solid fa-arrow-down-long ${styles.HeartOutline}`} />
            </span>
          ): up_vote_id && !down_vote_id ? (
            // already upvoted
            <span>
              <i className="fa-solid fa-arrow-down-long" />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to vote on posts!</Tooltip>}
            >
              <i className="fa-solid fa-arrow-down-long" />
            </OverlayTrigger>
          )}
          

        </span>


        <div>
          {/* {likes_count} */}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {/* {comments_count} */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;