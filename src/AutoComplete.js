import React, { Component } from "react";
import "./AutoComplete.css";
import AutoCompleteItem from "./AutoCompleteItem";
import TextInput from "./TextInput";

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

  onChange = async e => {
    e.persist();
    this.props.onChange(e);
    const value = e.target.value;
    const matches = await this.filterItems(value);
    // console.group("in autoComplete onChange");
    // console.log({ value });
    // console.groupEnd();
    this.setState({ searchTerm: value, matches }, () => {});
  };

  filterItems = async value => {
    if (!value) {
      return [];
    }

    if (this.props.filterItems) {
      return await this.props.filterItems(value, this.props.items);
    }

    return this.props.items.filter(c =>
      c.toUpperCase().startsWith(value.toUpperCase())
    );
  };

  onKeyDown = e => {
    e.persist();
    //40 down
    //38 up
    //13 enter
    //27 esc
    //9 tab
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
          this.props.onChange({
            target: { name: this.props.name, value: selectedValue }
          });
          this.setState({
            searchTerm: selectedValue,
            matches: [],
            currentFocus: -1
          });
        }
        break;
      case 9:
      case 27:
        this.setState({ matches: [] });
        break;
      default:
        break;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  onItemClick = itemIndex => {
    const clicked = this.state.matches[itemIndex];
    this.setState({
      searchTerm: clicked,
      matches: [],
      currentFocus: -1
    });
    this.props.onChange({ target: { name: this.props.name, value: clicked } });
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

  onBlur = e => {};

  render() {
    const { onKeyDown, onChange, ...thinProps } = this.props;
    return (
      <div className="auto-complete-wrapper">
        <TextInput
          className="ac-input"
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          {...thinProps}
        />
        <div className="auto-complete-items-container">{this.getItems()}</div>
      </div>
    );
  }
}

export default AutoComplete;
