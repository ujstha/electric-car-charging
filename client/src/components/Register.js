import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Alert } from "reactstrap";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
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
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      toDashboard: false,
      visible: false,
      infoColor: "danger",
    };
  }

  handleSuccess = () => {
    this.setState({
      visible: true,
      infoColor: "success",
      message: "Registration Successful.... Redirecting to Login Page in ",
    });
  };

  handleError = (msg) => {
    this.setState({
      visible: true,
      infoColor: "danger",
      message: msg,
    });
  };

  onDismiss = () => {
    this.setState({ visible: false });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  routeChange = event => {
    event.preventDefault();
    const user = {
      "firstname": this.state.firstname,
      "lastname": this.state.lastname,
      "username": this.state.username,
      "password": this.state.password,
    };
    axios
      .post(`/api/user`, user)
      .then(res => {
        if (res.data) {
          this.handleSuccess();
          var timeleft = 3;
          var downloadTimer = setInterval(function() {
            document.getElementById("countdown").innerHTML =
              timeleft + " seconds.";
            timeleft -= 1;
            if (timeleft <= 0) {
              clearInterval(downloadTimer);
              document.location = "/login";
            }
          }, 1000);
        }
      })
      .catch(err => {
        this.handleError(err.response.data);
      });
  };

  render() {
    if (localStorage.getItem("x-auth-token")) {
      return <Redirect to="/dashboard" />;
    }
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper} style={{ borderRadius: "0px" }}>
          <Alert
            style={{ borderRadius: "0px" }}
            color={this.state.infoColor}
            isOpen={this.state.visible}
            toggle={this.onDismiss}
          >
            {this.state.message}
            <b id="countdown"></b>
          </Alert>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} onSubmit={this.routeChange}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstname">First Name</InputLabel>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastname">Last Name</InputLabel>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
                onChange={this.onChange}
              />
            </FormControl>
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
              Register
            </Button>
          </form>
          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Sign In
            </Link>
          </p>
        </Paper>
      </main>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
