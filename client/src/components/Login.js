import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Alert } from "reactstrap";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing(3))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      toDashboard: false,
      visible: false,
      infoColor: "",
      message: "",
    };
  }

  onDismiss = () => {
    this.setState({ visible: false });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  routeChange = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post(`/api/login`, user)
      .then(res => {
        localStorage.setItem("x-auth-token", res.data.token);
        if (res.data.token) {
          document.location = "/dashboard";
        }
      })
      .catch(err => {
        this.setState({
          visible: true,
          infoColor: "danger",
          message: err.response.data,
        });
      });
  };

  render() {
    if (localStorage.getItem("x-auth-token")) {
      return <Redirect to="/dashboard" />;
    }
    const { classes } = this.props;
    const { infoColor, visible, message } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper} style={{ borderRadius: "0px" }}>
          <Alert
            style={{ borderRadius: "0px" }}
            color={infoColor}
            isOpen={visible}
            toggle={this.onDismiss}
          >
            {message}
          </Alert>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={this.routeChange}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                onChange={this.onChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ borderRadius: "0px" }}
            >
              Sign in
            </Button>
          </form>
          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </p>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
