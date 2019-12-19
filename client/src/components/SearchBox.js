import React from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: [],
    };
  }

  escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  getSuggestions = value => {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    // const regex = new RegExp("^" + escapedValue, "i");

    return this.props.data.filter(
      locationList =>
        // regex.test(

        // )
        locationList.street
    );
  };

  getSuggestionValue = suggestion => {
    return `${suggestion.stationName}, ${suggestion.street} ${suggestion.building}, ${suggestion.zipcode} ${suggestion.city}, Finland`;
  };

  renderSuggestion = suggestion => {
    return (
      <span>
        {suggestion.stationName}
        <br />
        <small>
          {suggestion.street} {suggestion.building}, {suggestion.zipcode}{" "}
          {suggestion.city}, Finland
        </small>
      </span>
    );
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
    if (newValue !== "") {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${newValue}.json?limit=10&language=en-US&access_token=pk.eyJ1IjoidWpqdSIsImEiOiJjazIwZmJwZTkwa3lyM2lwOTRsdG14M2J1In0.MnyLebfZgAXMECmt9ugFiw`
        )
        .then(res => console.log(res));
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type Street name to search.....",
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
