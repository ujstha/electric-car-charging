import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from "reactstrap";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import axios from "axios";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      isOpen: false,
      users: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      axios
        .get(`http://localhost:5000/api/user`, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then(res => {
          let users = res.data;
          this.setState({
            users: users,
          });
        });
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  logOut() {
    localStorage.removeItem("x-auth-token");
    if (!localStorage.getItem("x-auth-token")) {
      document.location = "/";
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  dashboard() {
    document.location = "/dashboard";
  }

  render() {
    const { anchorEl, users } = this.state;
    const activeStyle = { color: "white", backgroundColor: "rgba(0,0,0,.4)" };
    const loginNav = (
      <ul className="navbar-nav nav ml-auto">
        <li>
          <Link
            className="nav-link"
            to="/"
            style={this.props.location.pathname === "/" ? activeStyle : {}}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="nav-link"
            to="/login"
            style={this.props.location.pathname === "/login" ? activeStyle : {}}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            className="nav-link"
            to="/register"
            style={
              this.props.location.pathname === "/register" ? activeStyle : {}
            }
          >
            Register
          </Link>
        </li>
      </ul>
    );

    const userNav = (
      <ul className="navbar-nav nav ml-auto">
        <li>
          <a
            href="#/"
            className="nav-link"
            onClick={this.handleClick}
            style={window.location.pathname === "/dashboard" ? activeStyle : {}}
          >
            <AccountCircle /> {users.firstname}
          </a>
        </li>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>
            Welcome &nbsp;<b>{users.firstname}!</b>
          </MenuItem>
          <Divider />
          <MenuItem onClick={this.dashboard.bind(this)}>Dashboard</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={this.logOut.bind(this)}>Logout</MenuItem>
        </Menu>
      </ul>
    );
    return (
      <div>
        <Navbar
          style={{ backgroundColor: "#6A1B9A" }}
          dark
          expand="md"
          className="fixed-top"
        >
          <NavbarBrand
            href="/"
            style={{
              fontFamily: "Srisakdi",
              fontStyle: "cursive",
              color: "white",
            }}
          >
            Financial
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {localStorage.getItem("x-auth-token") ? userNav : loginNav}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
