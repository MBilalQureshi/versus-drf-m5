import Container from 'react-bootstrap/esm/Container';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom'
import NotFound from './components/NotFound';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignIn';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostEditForm from './pages/posts/PostEditForm';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
        <Route exact path='/' render={() => <PostsPage message="No results found. Ajdust the search keyword." />} />
          {/* <Route exact path='/feed' render={() => <PostsPage message="No results found. Ajdust the search keyword or follow a user." filter={`owner__followed__owner__profile=${profile_id}&`} />} /> */}
          <Route exact path='/voted' render={() => <PostsPage message="No results found. Ajdust the search keyword or vote on a post." filter={`vote__owner__profile=${profile_id}&ordering=-likes__created_at&`} />} />
          <Route exact path='/signin' render={() => <SignInForm/> }></Route>
          <Route exact path='/signup' render={() => <SignUpForm /> }></Route>
          <Route exact path='/posts/create' render={() => <PostCreateForm />}></Route>
          <Route exact path='/products/posts/:id' render={() => <PostPage />}></Route>
          <Route exact path='/products/posts/:id/edit' render={()=> <PostEditForm />}></Route>
          <Route render={() => <NotFound />}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;