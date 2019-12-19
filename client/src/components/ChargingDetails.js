import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment";

export default class ChargingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  render() {
    const {
      connectorType,
      startTime,
      endTime,
      chargingTime,
      totalCost,
      latitude,
      longitude,
      address,
      chargingStation,
    } = this.props;
    return (
      <Card className="text-dark">
        <CardBody>
          <span>
            <strong>Connector Type :</strong>{" "}
            {connectorType === "slow"
              ? "SLOW | 22kW Charger with Type 2 Connector"
              : "FAST | 50-100kW Charger with CSS Connector"}
          </span>
          <br />
          <span>
            <strong>Charging Start Date/Time :</strong>{" "}
            {moment(startTime).format("Do MMM, YYYY, h:mm:s a")}
          </span>
          <br />
          <span>
            <strong>Charging End Date/Time :</strong>{" "}
            {moment(endTime).format("Do MMM, YYYY, h:mm:s a")}
          </span>
          <br />
          <span>
            <strong>Total Time for Charging :</strong> {chargingTime}
          </span>
          <br />
          <span>
            <strong>Rate per min or kWh :</strong>{" "}
            {connectorType === "slow" ? "0.20 euro/min" : "0.18 euro/kWh"}
          </span>
          <br />
          <span>
            <strong>
              Total Cost of Charging for{" "}
              <b className="text-danger">{chargingTime}</b> :
            </strong>{" "}
            {totalCost} Euro (&euro;)
          </span>
          <br />
          <br />
          <strong>Detail about Station </strong>
          <br />
          <span className="text-capitalize">
            Station : {chargingStation}
            <br /> Location : {address}
            <br /> <i className="fa fa-map-marker"></i> &nbsp; {latitude},{" "}
            {longitude}
          </span>
        </CardBody>
      </Card>
    );
  }
}
