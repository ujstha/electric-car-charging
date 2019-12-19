import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBoxDisplay: false,
      anchorEl: null,
      users: "",
      isLoaded: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      axios
        .get(`/api/user`, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then(res => {
          let users = res.data;
          this.setState({
            users: users,
            isLoaded: true,
          });
        });
    }
  }

  menuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ anchorEl: null });
  };

  logOut = () => {
    localStorage.removeItem("x-auth-token");
    if (!localStorage.getItem("x-auth-token")) {
      document.location = "/";
    }
  };

  render() {
    const { users, anchorEl, isLoaded } = this.state;
    const pathname = this.props.location.pathname;
    const nav = [
      {
        link: "/",
        name: "Home",
      },
      {
        link: "/login",
        name: "Login",
      },
      {
        link: "/register",
        name: "Register",
      },
    ];

    const loggedNav = [
      {
        link: "/",
        name: "Home",
      },
      {
        link: "#/",
        name: `${isLoaded ? users.firstname : ""}`,
      },
    ];

    return (
      <div>
        <Helmet>
          <title>
            {`${
              pathname === "/" || pathname === ""
                ? "Home - Get location for charging your vehicle | E-Car"
                : pathname === "/login"
                ? "Login | E-Car"
                : pathname === "/register"
                ? "Register | E-Car"
                : pathname === "/dashboard"
                ? `Dashboard - ${users.firstname} ${users.lastname}`
                : "Home - Get location for charging your vehicle | E-Car"
            }`}{" "}
          </title>
        </Helmet>
        <div className="nav-main">
          <ul>
            {!localStorage.getItem("x-auth-token")
              ? nav.map((navbar, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={`${navbar.link}`}
                        className={
                          this.props.location.pathname === navbar.link
                            ? "active"
                            : ""
                        }
                      >
                        {navbar.name}
                      </Link>
                    </li>
                  );
                })
              : loggedNav.map((navbar, index) => {
                  return (
                    <li key={index}>
                      <a
                        href={`${navbar.link}`}
                        className={
                          this.props.location.pathname === navbar.link
                            ? "active"
                            : ""
                        }
                        onClick={
                          navbar.name === users.firstname
                            ? this.menuOpen
                            : this.menuClose
                        }
                      >
                        {navbar.name === users.firstname ? (
                          <span>
                            <i className="fa fa-user-circle"></i>{" "}
                            {users.firstname}
                          </span>
                        ) : (
                          navbar.name
                        )}
                      </a>
                    </li>
                  );
                })}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.menuClose}
            >
              <MenuItem>
                Welcome &nbsp;<b>{users.firstname}!</b>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => (document.location = "/dashboard")}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={this.logOut} style={{ color: "red" }}>
                Logout
              </MenuItem>
            </Menu>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
