import Container from 'react-bootstrap/esm/Container';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom'
import NotFound from './components/NotFound';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignIn';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path='/' render={() => <h1>Home</h1>}></Route>
          <Route exact path='/signin' render={() => <SignInForm/> }></Route>
          <Route exact path='/signup' render={() => <SignUpForm /> }></Route>
          <Route exact path='/posts/create' render={() => <PostCreateForm />}></Route>
          <Route exact path='/products/:id' render={() => <PostPage />}></Route>
          <Route render={() => <NotFound />}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;