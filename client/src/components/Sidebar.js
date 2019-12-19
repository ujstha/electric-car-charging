import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

const sidenav = [
  {
    link: "/",
    icon: "fa fa-home",
    name: "Home",
  },
  {
    link: "/top_rated",
    icon: "fa fa-film",
    name: "Movies",
  },
  {
    link: "/tv",
    icon: "fa fa-video-camera",
    name: "TV Series",
  },
];

class Sidebar extends Component {
  render() {
    return (
      <div className="sidenav" style={{ display: this.props.display }}>
        <ul>
          {sidenav.map((sidebar, index) => {
            return (
              <li key={index}>
                <Link
                  to={`${sidebar.link}`}
                  className={
                    this.props.location.pathname === sidebar.link
                      ? "active"
                      : ""
                  }
                >
                  <i className={`${sidebar.icon}`}></i>
                  <br />
                  <span>{sidebar.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(Sidebar);
