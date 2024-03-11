import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Post = (props) => {
    const {id, owner, category, category_name, content, created_at, down_vote_id,
    image, profile_id, profile_image, title, up_vote_id, updated_at,postPage,
    down_votes_count, up_votes_count, comments_count, location, price, setPosts} = props
    
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner
    const history = useHistory()

    const handleEdit = () => {
      history.push(`/products/posts/${id}/edit`)
    }

    const handleDelete = async () => {
      try {
        await axiosRes.delete(`/products/posts/${id}/`);
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    };

    const handleUpVote = async () => {
      try{
        const postData = {
          product: id, // Assuming you have product object passed as a prop
          up_vote:  true,
          down_vote: false, // Set to false as it's an upvote
        };
        const {data} = await axiosRes.post('/votes/', postData)
        setPosts((prevPosts)=>({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
            ? {...post, up_votes_count: post.up_votes_count + 1, up_vote_id: data.id}: post;
          })
        }))
      }catch(err){
        console.log(err)
      }
    }
  
    const handleVoteDelete = async () => {
      try{
        let vote_id = 0
        if (up_vote_id === null){
          vote_id = down_vote_id
        }else{
          vote_id = up_vote_id
        }
        await axiosRes.delete(`/votes/${vote_id}/`)
        setPosts((prevPosts)=>({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id && up_vote_id
            ? {...post, up_votes_count: post.up_votes_count - 1, up_vote_id: null}
            : post.id === id && down_vote_id
            ? {...post, down_votes_count: post.down_votes_count - 1, down_vote_id: null}
            : post;
          })
        }))
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
        const {data} = await axiosRes.post('/votes/', postData)
        setPosts((prevPosts)=>({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
            ? {...post, down_votes_count: post.down_votes_count + 1, down_vote_id: data.id}: post;
          })
        }))
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
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`products/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>Description: {content}</Card.Text>}
        {category_name && <Card.Text>Catgory: {category_name}</Card.Text>}
        {price && <Card.Text>Price: {price} &#8364;</Card.Text>}
        {location && <Card.Text>Location: {location}</Card.Text>}
        <span className={`mr-5 ${styles.PostBar}`}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't vote on your own post!</Tooltip>}
            >
              <i className="fa-solid fa-thumbs-up" />
            </OverlayTrigger>
          ) : up_vote_id && !down_vote_id ? (

            <span onClick={() => {}}>
              <i className={`fa-solid fa-thumbs-up ${styles.Heart}`} />
            </span>
          ) : currentUser && !up_vote_id && !down_vote_id ? (
            // have not up voted yet
            <span onClick={handleUpVote} value="upVote">
              <i className={`fa-solid fa-thumbs-up ${styles.HeartOutline}`} />
            </span>
          ) : !up_vote_id && down_vote_id ? (
            // already upvoted
            <span>
              <i className="fa-solid fa-thumbs-up" />
            </span>
          ): (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to vote on posts!</Tooltip>}
            >
              <i className="fa-solid fa-thumbs-up" />
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
            <span onClick={handleVoteDelete}>
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
              <i className="fa-solid fa-thumbs-down" />
            </OverlayTrigger>
          ) : down_vote_id && !up_vote_id ? (
            <span onClick={() => {}}>
              <i className={`fa-solid fa-thumbs-down ${styles.Heart}`} />
            </span>
          ) : currentUser && ! down_vote_id && !up_vote_id? (
            <span onClick={handleDownVote}>
              <i className={`fa-solid fa-thumbs-down ${styles.HeartOutline}`} />
            </span>
          ): up_vote_id && !down_vote_id ? (
            // already upvoted
            <span>
              <i className="fa-solid fa-thumbs-down" />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to vote on posts!</Tooltip>}
            >
              <i className="fa-solid fa-thumbs-down" />
            </OverlayTrigger>
          )}
          

        </span>


        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Post Total up votes</th>
                <th>Post Total Down votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{up_votes_count}</td>
                <td>{down_votes_count}</td>
              </tr>
            </tbody>
          </Table>
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;