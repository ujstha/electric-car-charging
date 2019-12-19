import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { FormGroup, Label, Input, Alert } from "reactstrap";
import ms from "pretty-ms";
import axios from "axios";

class CityInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      time: 0,
      isOn: false,
      chargingStarted: false,
      isAlert: false,
      start: 0,
      cost: 0,
      startTime: 0,
      endTime: 0,
    };
  }

  showAlert = () => {
    this.setState({
      isAlert: true,
    });
  };

  closeAlert = () => {
    this.setState({
      isAlert: false,
    });
  };

  goToCharging = () => {
    this.setState({
      isOn: true,
    });
  };

  startCharging = () => {
    this.setState({
      chargingStarted: true,
      time: this.state.time,
      startTime: Date.now(),
      start: Date.now() - this.state.time,
    });
    this.timer = setInterval(
      () => this.setState({ time: Date.now() - this.state.start }),
      1
    );
  };

  stopCharging = () => {
    this.setState({ isOn: true, chargingStarted: false });
    clearInterval(this.timer);
    localStorage.setItem("stopTime", this.state.time);
    localStorage.setItem(
      "totalCostOfCharging",
      (
        (this.state.time / 60000) *
        (this.state.value === "slow" ? 0.2 : 0.18)
      ).toFixed(3)
    );
    this.setState({ time: 0 });
  };

  goBack = () => {
    this.setState({
      isOn: false,
    });
  };

  stopAndSave = e => {
    this.stopCharging();
    e.preventDefault();

    const charger = {
      chargingStation: this.chargingStation.value,
      address: this.address.value,
      latitude: this.latitude.value,
      longitude: this.longitude.value,
      connectorType: this.connectorType.value,
      startTime: this.startTime.value,
      endTime: Date.now(),
      chargingTime: this.chargingTime.value,
      totalCost: this.totalCost.value,
    };
    axios
      .post(`/api/charger/${localStorage.uID}`, charger)
      .then(res => console.log(res));
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { info } = this.props;
    const {
      isOn,
      value,
      isAlert,
      time,
      startTime,
      endTime,
      chargingStarted,
    } = this.state;
    localStorage.setItem(
      "costOfChargingCounter",
      (time / 60000) * (value === "slow" ? 0.2 : 0.18) //not used toFixed func. here
    );
    return (
      <div className="text-dark m-2">
        <b style={{ fontSize: 20 }}>{info.stationName}</b>
        <br />
        <br />
        <div className="card">
          {!isOn ? (
            <div className="card-body">
              {info.street} {info.building}, {info.zipcode} {info.city}
              <br />
              <i className="fa fa-map-marker"></i> &nbsp;{info.latitude},{" "}
              {info.longitude}
              <div className="my-2">
                <span>
                  “Slow” 22kW chargers with Type 2 connectors for 0.20 euro/min.
                </span>
                <br />
                <span>
                  “Fast” 50-150kW chargers with CCS connectors for 18 cent/kWh.
                </span>
              </div>
              <a href={info.mapURL} target="_blank" rel="noopener noreferrer">
                View in Google Maps
              </a>
              <div>
                <Button
                  variant="contained"
                  className="my-2"
                  onClick={
                    localStorage.getItem("x-auth-token")
                      ? this.goToCharging
                      : this.showAlert
                  }
                >
                  Go to Charging
                </Button>
                <Alert color="danger" isOpen={isAlert} toggle={this.closeAlert}>
                  Please <a href="/login">Login</a> to start charging.
                  <br />
                  No Account? No worries. Register <a href="/register">here</a>
                </Alert>
              </div>
            </div>
          ) : (
            <div className="card-body">
              <FormGroup tag="fieldset" value={value}>
                <legend>Select Connector</legend>
                <Alert
                  color="warning"
                  isOpen={value === "" ? true : false}
                  toggle={this.closeAlert}
                >
                  Please Select a Connector to start charging
                </Alert>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      value="slow"
                      onChange={this.handleChange}
                      checked={value === "slow" ? true : false}
                      disabled={chargingStarted ? true : false}
                    />{" "}
                    “Slow” 22kW (Type 2) (0.20 euro/min)
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      value="fast"
                      onChange={this.handleChange}
                      checked={value === "fast" ? true : false}
                      disabled={chargingStarted ? true : false}
                    />{" "}
                    “Fast” 50-150kW (CCS) (18 cent/kWh)
                  </Label>
                </FormGroup>
              </FormGroup>
              <form onSubmit={this.stopAndSave}>
                <input
                  type="hidden"
                  name="chargingStation"
                  value={info.stationName}
                  ref={input => {
                    this.chargingStation = input;
                  }}
                />
                <input
                  type="hidden"
                  name="address"
                  value={`${info.street} ${info.building}, ${info.zipcode} ${info.city}`}
                  ref={input => {
                    this.address = input;
                  }}
                />
                <input
                  type="hidden"
                  name="latitude"
                  value={info.latitude}
                  ref={input => {
                    this.latitude = input;
                  }}
                />
                <input
                  type="hidden"
                  name="longitude"
                  value={info.longitude}
                  ref={input => {
                    this.longitude = input;
                  }}
                />
                <input
                  type="hidden"
                  name="connectorType"
                  value={value}
                  ref={input => {
                    this.connectorType = input;
                  }}
                />
                <input
                  type="hidden"
                  name="startTime"
                  value={startTime}
                  ref={input => {
                    this.startTime = input;
                  }}
                />
                <input
                  type="hidden"
                  name="endTime"
                  value={endTime}
                  ref={input => {
                    this.endTime = input;
                  }}
                />
                <input
                  type="hidden"
                  name="chargingTime"
                  value={ms(time)}
                  ref={input => {
                    this.chargingTime = input;
                  }}
                />
                <input
                  type="hidden"
                  name="totalCost"
                  value={(
                    (time / 60000) *
                    (value === "slow" ? 0.2 : 0.18)
                  ).toFixed(3)}
                  ref={input => {
                    this.totalCost = input;
                  }}
                />
              </form>
              <Button
                variant="contained"
                className="my-2"
                onClick={
                  chargingStarted ? this.stopAndSave : this.startCharging
                }
                color={chargingStarted ? "secondary" : "primary"}
                disabled={value === "" ? true : false}
              >
                {chargingStarted ? "Stop Charging" : "Start Charging"}
              </Button>
              <br />
              {chargingStarted ? (
                <span style={{ fontSize: 18 }}>
                  Charging time: {ms(time)}
                  <br />
                  Cost of Charging <small>(in &euro;)</small> :{" "}
                  {((time / 60000) * (value === "slow" ? 0.2 : 0.18)).toFixed(
                    3
                  )}
                </span>
              ) : (
                ""
              )}
              {localStorage.totalCostOfCharging && localStorage.stopTime ? (
                <div>
                  Total time the Charger was connected :{" "}
                  {ms(Number(localStorage.stopTime))}
                  <br />
                  Total Cost of Charging :{" "}
                  {Number(localStorage.totalCostOfCharging).toFixed(3)} &euro;
                  <br />
                  <br />
                  <span onClick={this.goBack}>
                    <i className="fa fa-arrow-left"></i> &nbsp; Go Back
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CityInfo;
