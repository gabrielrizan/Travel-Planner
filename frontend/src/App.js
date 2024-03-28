import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import Test from "./components/Test";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CustomNavbar} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </Router>
  );
}

export default App;
