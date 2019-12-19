import React, { Component } from "react";
import Map from "./Map";
import axios from "axios";
import SearchBox from "../SearchBox";

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/data")
      .then(({ data }) => {
        this.setState({ loading: false, data: data }, () =>
          console.log("Data Loaded")
        );
      })
      .catch(e => console.log(e));
  }

  render() {
    const { loading, data } = this.state;

    return (
      <>
        {loading ? (
          <div className="loading"></div>
        ) : (
          <>
            <div className="mt-3">
              <SearchBox data={data} />
            </div>
            <div className="my-4">
              <h3>
                Charging Station around Finland is pinned in the map below.
              </h3>
            </div>
            <Map cities={data} />
          </>
        )}
      </>
    );
  }
}

export default MainMap;
