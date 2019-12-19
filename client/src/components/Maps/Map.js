import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import CityPin from "./CityPin";
import CityInfo from "./CityInfo";

const TOKEN =
  "pk.eyJ1IjoidWpqdSIsImEiOiJjazIwZmJwZTkwa3lyM2lwOTRsdG14M2J1In0.MnyLebfZgAXMECmt9ugFiw"; // mapbox token

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100%",
        height: 88 + "vh",
        latitude: 65.011,
        longitude: 25.4,
        zoom: 10,
        bearing: 0,
        pitch: 0,
      },
      popupInfo: null,
    };
  }

  updateViewport = viewport => {
    this.setState({ viewport });
  };

  renderCityMarker = (city, index) => {
    if (city) {
      return (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
        >
          <CityPin
            size={50}
            onClick={() => this.setState({ popupInfo: city })}
          />
        </Marker>
      );
    }
  };

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={10}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;

    return (
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={this.updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        {this.props.cities.map(this.renderCityMarker)}

        {this.renderPopup()}
      </ReactMapGL>
    );
  }
}
