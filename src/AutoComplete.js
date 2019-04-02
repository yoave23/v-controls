import React, { Component } from "react";
import "./AutoComplete.css";
import AutoCompleteItem from "./AutoCompleteItem";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central Arfrican Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauro",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre & Miquelon",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St Kitts & Nevis",
  "St Lucia",
  "St Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];
class AutoComplete extends Component {
  constructor() {
    super();
    this.clickEvent = document.addEventListener("click", e => {
      if (!e.target.parentElement) {
        return;
      }
      const parentClassList = e.target.parentElement.classList;
      const test1 = parentClassList.contains("auto-complete-items-container");
      const test2 = parentClassList.contains("auto-complete-wrapper");
      if (!test1 && !test2) {
        this.setState({ matches: [] });
      }
    });
  }

  state = {
    currentFocus: -1,
    searchTerm: "",
    matches: []
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.clickEvent);
  }

  onAcChange = e => {
    const value = e.target.value;
    let matches = [];
    if (value.length > 0) {
      matches = countries.filter(c =>
        c.toUpperCase().startsWith(value.toUpperCase())
      );
    } else {
      matches = [];
    }
    this.setState({ searchTerm: value, matches });
  };

  onKeyDown = e => {
    //40 down
    //38 up
    //13 enter
    //27 esc
    console.log("onKeyDown", e.keyCode);
    const key = e.keyCode;
    const matchesLength = this.state.matches.length;
    const currentFocus = this.state.currentFocus;

    switch (key) {
      case 40:
        if (currentFocus < matchesLength - 1 && matchesLength > 0) {
          this.setState({ currentFocus: currentFocus + 1 });
        }
        e.preventDefault();
        break;
      case 38:
        if (currentFocus > -1 && matchesLength > 0) {
          this.setState({ currentFocus: currentFocus - 1 });
        }
        e.preventDefault();
        break;
      case 13:
        if (currentFocus > -1) {
          const selectedValue = this.state.matches[currentFocus];
          this.setState({
            searchTerm: selectedValue,
            matches: [],
            currentFocus: -1
          });
        }
        break;
      case 27:
        this.setState({ matches: [] });
        break;
      default:
        break;
    }
  };

  onItemClick = itemIndex => {
    const clicked = this.state.matches[itemIndex];
    this.setState({
      searchTerm: clicked,
      matches: [],
      currentFocus: -1
    });
  };

  getItem = (val, index) => {
    return (
      <AutoCompleteItem
        key={val}
        index={index}
        currentFocus={this.state.currentFocus}
        value={val}
        onItemClick={this.onItemClick}
      />
    );
  };

  getItems = () => {
    return this.state.matches.map((item, index) => this.getItem(item, index));
  };

  render() {
    return (
      <div className="auto-complete-wrapper">
        <div>currentFocus: {this.state.currentFocus}</div>
        <div>matches.length: {this.state.matches.length}</div>
        <input
          type="text"
          onChange={this.onAcChange}
          onKeyDown={this.onKeyDown}
          value={this.state.searchTerm}
        />
        <div
          className="auto-complete-items-container"
          id={
            (this.props.id || this.props.name) + "auto-complete-items-container"
          }
        >
          {this.getItems()}
        </div>
      </div>
    );
  }
}

export default AutoComplete;
