import "./App.css";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { useSelector } from "react-redux";

function App() {
  const { authData } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Container maxwidth="xl">
        <Navbar />
        <Switch>
          <Route
            path="/auth"
            component={() => (!authData ? <Auth /> : <Redirect to="/posts" />)}
          ></Route>
          <Route exact path="/posts/search" component={Home}></Route>
          <Route path="/posts/:id" component={PostDetails}></Route>
          <Route path="/posts" component={Home}></Route>
          <Route path="/" component={() => <Redirect to="/posts" />}></Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
