import { Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import MainHeader from './components/MainHeader';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className='App'>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login"></Redirect>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
