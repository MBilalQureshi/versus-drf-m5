import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Post from "./Post";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";

// This component shows all the possible posts
function CategoryPosts({ message, filter = "" }) {
  // 1- message prop is active when there is no post to show
  // 2- filter is to apply which for showing posts, by default its empty string

  // State to set the categories
  const [categories, setCategories] = useState();

  // State sets posts, manages list of posts
  const [posts, setPosts] = useState({ results: [] });

  // State loader as boolean
  const [hasLoaded, setHasLoaded] = useState(false);

  // This history hook handles navigation
  const { pathname } = useLocation();

  // Fetch current user from CurrentUserContext
  const currentUser = useCurrentUser();

  // Set query state for searching posts
  const [query, setQuery] = useState("");

  // Fetch category lable from URL
  const { label } = useParams();

  // Fetch posts on mount once page loads
  useEffect(() => {
    const fetchPosts = async () => {
        try {
          let responseData;
          if (query.length > 0) {
            const { data } = await axiosReq.get(
              `/products/posts/?${filter}search=${query}`
            );
            responseData = data;
          } else {
            const { data } = await axiosReq.get(`/products/posts/?search=${label}`
            );
            responseData = data;
          }
          setPosts(responseData);
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };

    // Set post loading time while searching
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    // Clearing timeout
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser, label]);

  // Get all categories on page load
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get("/categories/");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, []);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <div className={`${appStyles.Content} mt-3`}>
          <p>Filter by Category</p>
          {categories ? (
            Object.entries(categories).map(([value, label]) => (
              <NavLink
                key={value}
                exact
                to={`/category/posts/${label}`} // Specify the URL for each category
                className={styles.NavLink}
                activeClassName={styles.Active}
              >
                <Button className="mr-2 mt-2" variant="outline-dark">
                  {label}
                </Button>
              </NavLink>
            ))
          ) : (
            <Asset spinner />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default CategoryPosts;
