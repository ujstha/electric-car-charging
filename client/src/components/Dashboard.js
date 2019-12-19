import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, CardTitle, Button, Badge } from "reactstrap";
import animateScrollTo from "animated-scroll-to";
import ChargingDetails from "./ChargingDetails";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      charger: [],
      showMore: false,
      changePadding: true,
      tab: "",
      isLoaded: false,
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("x-auth-token");
    axios
      .all([
        axios.get(`/api/user`, {
          headers: {
            "x-auth-token": token,
          },
        }),
        axios.get(`/api/charger`, {
          headers: {
            "x-auth-token": token,
          },
        }),
      ])
      .then(
        axios.spread((user, charger) => {
          this.setState({
            user: user.data,
          });
          this.setState({
            charger: charger.data,
            isLoaded: true,
          });
        })
      );
    animateScrollTo(0);
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentChangePadding = window.innerWidth < 768;
    if (currentChangePadding !== this.state.changePadding) {
      this.setState({ changePadding: currentChangePadding });
    }
    animateScrollTo(0);
  }

  showAll = () => {
    this.setState({
      showMore: !this.state.showMore,
    });
    if (this.state.showMore) {
      animateScrollTo(0);
    }
  };

  goToTab(id) {
    animateScrollTo(document.getElementById(id));
  }

  render() {
    if (!localStorage.getItem("x-auth-token")) {
      return <Redirect to="/" />;
    }
    let { user, charger, showMore, tab, changePadding, isLoaded } = this.state;
    let chargerArray = charger;
    if (!showMore) chargerArray = charger.slice(0, 6);

    return (
      <div className="text-dark m-2">
        {isLoaded ? (
          <div>
            <div className="text-center">
              <h3>
                Hello, <span className="text-capitalize">{user.firstname}</span>
              </h3>
              <span>Your charging history will be shown here.</span>
            </div>

            {chargerArray.length !== 0 ? (<div className="row mt-3">
              <div className="col-md-4">
                <Card>
                  <CardBody>
                    <CardTitle
                      className="font-weight-bolder"
                      style={{ fontSize: 22 }}
                    >
                      Charging Stations you have visited
                    </CardTitle>
                    {chargerArray.length !== 0 ? (
                      chargerArray.map((charge, index) => {
                        return (
                          <Card
                            key={index}
                            className="mt-2 tab"
                            id={`${charge._id}`}
                            onClick={() => {
                              this.setState({ tab: charge._id });
                              changePadding
                                ? this.goToTab(charge._id)
                                : this.componentDidMount();
                            }}
                          >
                            <CardBody
                              style={
                                tab === charge._id
                                  ? {
                                    backgroundColor: "rgba(0,0,0,.8)",
                                    color: "white",
                                  }
                                  : { cursor: "pointer" }
                              }
                              className={!changePadding ? "c-body" : ""}
                            >
                              {changePadding &&
                                charge.endTime + 1000 * 60 * 60 * 24 >
                                Date.now() ? (
                                  <Badge
                                    color="secondary"
                                    className="p-2"
                                    style={{ letterSpacing: 1.5 }}
                                  >
                                    NEW VISIT
                                </Badge>
                                ) : (
                                  ""
                                )}
                              <div
                                className={!changePadding ? "c-body-left" : ""}
                              >
                                <span
                                  className="text-capitalize"
                                  style={{ fontSize: 18 }}
                                >
                                  {charge.chargingStation}
                                </span>
                                &nbsp; &nbsp;
                                {!changePadding ? (
                                  charge.endTime + 1000 * 60 * 60 * 24 >
                                    Date.now() ? (
                                      <Badge
                                        color="secondary"
                                        className="p-2"
                                        style={{ letterSpacing: 1.5 }}
                                      >
                                        NEW VISIT
                                    </Badge>
                                    ) : (
                                      ""
                                    )
                                ) : (
                                    ""
                                  )}
                                <br />
                                <span
                                  className="text-capitalize"
                                  style={{ fontSize: 15 }}
                                >
                                  {charge.address}
                                </span>
                                {changePadding && tab === charge._id ? (
                                  <ChargingDetails
                                    key={index}
                                    chargingTime={charge.chargingTime}
                                    chargingStation={charge.chargingStation}
                                    latitude={charge.latitude}
                                    longitude={charge.longitude}
                                    connectorType={charge.connectorType}
                                    totalCost={charge.totalCost}
                                    address={charge.address}
                                    startTime={charge.startTime}
                                    endTime={charge.endTime}
                                  />
                                ) : (
                                    ""
                                  )}
                              </div>
                              <div
                                className={`c-body-right ${
                                  !changePadding ? "" : "text-center"
                                  }`}
                              >
                                <i
                                  className={`fa ${
                                    changePadding
                                      ? "fa-angle-down"
                                      : "fa-angle-right"
                                    } ${tab === charge._id ? "active" : ""}`}
                                ></i>
                              </div>
                            </CardBody>
                          </Card>
                        );
                      })
                    ) : (
                        <p>
                          Charging stations you have visited to charge your
                          vehicle will be shown here.
                      </p>
                      )}
                    <Button
                      className="mt-3"
                      block
                      color={showMore ? "danger" : "primary"}
                      onClick={this.showAll}
                      style={chargerArray.length < 6 ? { display: "none" } : {}}
                    >
                      {showMore ? (
                        <span>
                          Show Less <i className="fa fa-angle-up"></i>
                        </span>
                      ) : (
                          <span>
                            Show More <i className="fa fa-angle-down"></i>
                          </span>
                        )}
                    </Button>
                  </CardBody>
                </Card>
              </div>
              <div
                className="col-md-8"
                style={changePadding ? { display: "none" } : {}}
              >
                <Card>
                  <CardBody>
                    <CardTitle
                      className="font-weight-bolder"
                      style={{ fontSize: 22 }}
                    >
                      Other Details
                      {tab === "" && chargerArray.length !== 0 ? (
                        <small>
                          <br />
                          Click the station tab on the left-side to get the
                          details
                        </small>
                      ) : (
                          ""
                        )}
                    </CardTitle>
                    {!changePadding && chargerArray.length !== 0 ? (
                      chargerArray.map((charge, index) => {
                        return tab === charge._id ? (
                          <ChargingDetails
                            key={index}
                            chargingTime={charge.chargingTime}
                            chargingStation={charge.chargingStation}
                            latitude={charge.latitude}
                            longitude={charge.longitude}
                            connectorType={charge.connectorType}
                            totalCost={charge.totalCost}
                            address={charge.address}
                            startTime={charge.startTime}
                            endTime={charge.endTime}
                          />
                        ) : (
                            ""
                          );
                      })
                    ) : (
                        <p>
                          Your cost, time and charging details will be shown here.
                      </p>
                      )}
                  </CardBody>
                </Card>
              </div>
            </div>) : (<Card className="mt-5"><CardBody>Your Charging history is empty. Please visit charging station to charge your vehicle and get info on this dashboard. <br />
              <div className="bg-info p-2 mt-3"><a href="/" style={{color: "white", fontSize: 25}}>Click here to see stations on map.</a></div></CardBody></Card>)}
          </div>
        ) : (
            <div className="loading"></div>
          )}
      </div>
    );
  }
}
