import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import usestyles from "./styles";
import memories from "../../images/memories.png";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut } from "../../actions/authAction";
import { useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import decode from "jwt-decode";

function Navbar() {
  const classes = usestyles();
  const { authData } = useSelector((state) => state.auth);
  const user = authData;
  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = useCallback(() => {
    dispatch(LogOut());
    history.push("/");
  },[dispatch, history]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      decodedToken.exp * 1000 < new Date().getTime() && logOut();
    }
  }, [logOut, user?.token]);

  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.flex}>
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h2"
            align="center"
          >
            Memories
          </Typography>
          <img className={classes.image} src={memories} alt="" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                src={user.result?.imageUrl}
                alt={user.result?.name || user?.username}
              >
                {user.result?.name.charAt(0) || user?.username.charAt(0)}
              </Avatar>

              <Typography className={`${classes.flex} ${classes.userName}`} variant="h6">
                {user.result?.name || user?.username}
              </Typography>

              <Button
                className={classes.logout}
                variant="contained"
                color="secondary"
                onClick={logOut}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
