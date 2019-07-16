import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Col, Nav } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

import { Store, Constants, Dispatcher } from "../../../flux";

class MainSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems()
    };

    this.onChange = this.onChange.bind(this);
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  componentWillMount() {
    Store.addChangeListener(Constants.CHANGE, this.onChange);
    // window.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.CHANGE, this.onChange);
    // window.removeEventListener("mousedown", this.handleClickOutside);
  }

  onChange() {
    this.setState({
      ...this.state,
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems()
    });
  }

  render() {
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-18",
      this.state.menuVisible && "open"
    );
    const icon = this.state.menuVisible ? (
      <i className="material-icons">&#xE5D2;</i>
    ) : (
      <i className="material-icons">&#xE5C4;</i>
    );

    return (
      // md={{ size: this.state.menuVisible ? 1 : 2 }}
      <Col
        className={classes}
        lg={{ size: this.state.menuVisible ? 0 : 2 }}
        md={{ size: 1 }}
      >
        {/* <Nav>
          <a className="toggle-sidebar show ">{icon}</a>
        </Nav> */}
        {/* <SidebarMainNavbar hideLogoText={this.state.menuVisible} /> */}
        {/* <SidebarSearch /> */}
        <SidebarNavItems />
      </Col>
    );
  }
}

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

export default MainSidebar;
