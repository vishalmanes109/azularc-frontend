import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserDetail from "./screens/UserDetails";
import SearchUser from "./screens/SearchUser";
import AddUser from "./screens/AddUser";
// import DataList from "./components/DataList";
import Nav from "./components/Nav";
// import UserCard from "./components/UserCard";
import NotFound from "./components/NotFound";
import UpdateUser from "./screens/UpdateUser";
import Home from "./screens/Home";
// import Search from "./components/Search";

function App() {
  return (
    <Router>
      <div>
        <header className="App-header">
          <Switch>
          <Route path="/home" exact component={Home}></Route>
            <Route path="/adduser" exact component={AddUser}></Route>
            <Route path="/update" exact component={UpdateUser}></Route>
            <Route path="/nav" exact component={Nav}></Route>
            <Route
              path="/userdetail"
              render={(props) => <UserDetail {...props} />}
              exact
              component={UserDetail}
            ></Route>
            <Route path="/search" exact component={SearchUser}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
