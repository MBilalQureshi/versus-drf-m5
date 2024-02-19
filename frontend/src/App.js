import Container from 'react-bootstrap/esm/Container';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom'
import NotFound from './components/NotFound';
import SignUpForm from './pages/auth/SignUpForm';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path='/' render={() => <h1>Home</h1>}></Route>
          <Route exact path='/signin' render={() => <h1>Sign in</h1>}></Route>
          <Route exact path='/signup' render={() => <SignUpForm />}></Route>
          <Route render={() => <NotFound />}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;