import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, Switch, Route } from 'react-router-dom';
import User from './components/user.component';
import UserList from './components/user-list.component';

class App extends React.Component {

  render() {
    return <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/users" className="navbar-brand">
        PremierSoft
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/users"} className="nav-link">
            Usuários
          </Link>
        </li>
      </div>
    </nav>
    {/* TODO: adicionar componentes */}
    <div className="container mt-3">
      <Switch>
        <Route exact path={["/", "/users"]} component={UserList} />
        <Route exact path="/users/add" component={User} />
        <Route exact path="/users/edit/:id" component={User} />
      </Switch>
    </div>
  </div>;
  }

}

export default App;
