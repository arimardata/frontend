import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand, NavLink } from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";

const SidebarMainNavbar = () => (
  <div className="l-5 main-navbar">
    <Navbar
      className=" align-items-stretch bg-white flex-md-nowrap border-right p-0"
      type="light"
    >
      <NavLink tag={RouteNavLink} to="/home">
        <NavbarBrand
          // className="w-100 mr-0"
          to="/home"
          style={{ lineHeight: "25px" }}
        >
          {/* <CollapsModel top={top} bottom={icon} /> */}
          <div className="d-table m-auto">
            <img
              id="main-logo"
              className=" d-inline-block align-top mr-1"
              style={{ maxWidth: "25px" }}
              src={require("../../../images/logo/favicon.ico")}
              alt="Passlflora"
            />
            {<span className="d-none d-md-inline ml-1">Passlflora</span>}
          </div>
        </NavbarBrand>
      </NavLink>
    </Navbar>
  </div>
);

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false
};

export default SidebarMainNavbar;
