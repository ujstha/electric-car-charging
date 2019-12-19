import React, { Component } from "react";
import Map from "../Maps/Map";
import axios from "axios";

class MainMapBackup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }
  //   by pushing data
  componentDidMount() {
    axios
      .get("/api/data")
      .then(({ data }) => {
        let validData = [];

        data.forEach(d => {
          if (
            d.stationName !== "NULL" &&
            d.longitude !== "NULL" &&
            d.latitude !== "NULL" &&
            d.building !== "NULL" &&
            d.street !== "NULL" &&
            d.city !== "NULL" &&
            d.zipcode !== "NULL" &&
            d.mapURL !== "NULL"
          ) {
            let validItem = {
              stationName: d.stationName,
              city: d.city,
              street: d.street,
              building: d.building,
              zipcode: d.zipcode,
              longitude: d.longitude,
              latitude: d.latitude,
              mapURL: d.mapURL,
            };
            validData.push(validItem);
          }
        });

        this.setState({ loading: false, data: validData }, () =>
          console.log("loaded")
        );
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
      <>
        {this.state.loading ? (
          <div className="loading"></div>
        ) : (
          <>
            <Map
              cities={localStorage.query ? localStorage.query : this.state.data}
            />
          </>
        )}
      </>
    );
  }
}

export default MainMapBackup;
