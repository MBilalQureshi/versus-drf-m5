import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";

function App() {
  // Get current user from CurrentUserContext
  const currentUser = useCurrentUser();

  // Get profile id if exist else empty string
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Ajdust the search keyword." />
            )}
          />
          <Route
            exact
            path="/trending"
            render={() => (
              <PostsPage
                message="No results found. Ajdust the search keyword or follow a user."
                filter={"&ordering=-up_votes_count&"}
              />
            )}
          />
          <Route
            exact
            path="/voted"
            render={() => (
              <PostsPage
                message="No results found. Ajdust the search keyword or vote on a post."
                filter={`vote__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />}></Route>
          <Route exact path="/signup" render={() => <SignUpForm />}></Route>
          <Route
            exact
            path="/posts/create"
            render={() => <PostCreateForm />}
          ></Route>
          <Route
            exact
            path="/products/posts/:id"
            render={() => <PostPage />}
          ></Route>
          <Route
            exact
            path="/products/posts/:id/edit"
            render={() => <PostEditForm />}
          ></Route>
          <Route
            exact
            path="/profiles/:id"
            render={() => <ProfilePage />}
          ></Route>
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
