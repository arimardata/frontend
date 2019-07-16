import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

import { Dispatcher, Constants, Store } from "../../../../flux";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  componentWillMount() {
    window.addEventListener("mousedown", this.handleClickOutside);
    // document.addEventListener("keydown", this.handleListener);
  }
  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleClickOutside);
    // document.addEventListener("keydown", this.handleListener);
  }

  logout = () => {
    Dispatcher.dispatch({ actionType: Constants.CLEARUSERDATA, payload: {} });
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        visible: false
      });
    }
  }

  render() {
    return (
      <div ref={this.setWrapperRef}>
        <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
          <DropdownToggle
            caret
            tag={NavLink}
            className="text-nowrap px-3"
            style={{ cursor: "pointer" }}
          >
            <img
              className="user-avatar rounded-circle mr-2"
              src={require("./../../../../images/avatars/0.jpg")}
              alt="User Avatar"
            />{" "}
            <span className="d-none d-md-inline-block">
              {Store.getUserData().username}
            </span>
          </DropdownToggle>
          <Collapse tag={DropdownMenu} right small open={this.state.visible}>
            <DropdownItem tag={Link} to="#">
              <i className="material-icons">&#xE7FD;</i> Profile
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={this.logout}
              tag={Link}
              to="/"
              className="text-danger"
            >
              <i className="material-icons text-danger">&#xE879;</i> Logout
            </DropdownItem>
          </Collapse>
        </NavItem>
      </div>
    );
  }
}
