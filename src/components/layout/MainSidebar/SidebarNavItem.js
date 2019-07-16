import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";
import CollapseModel from "../../../utils/CollapseModel";

const SidebarNavItem = ({ item, hideLogoText }) => {
  let top = (
    <NavItem style={{ cursor: "pointer" }}>
      <NavLink>
        {item.htmlBefore && (
          <div
            className="text-center d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
          />
        )}
        {!hideLogoText && <span>{item.title}</span>}
      </NavLink>
    </NavItem>
  );
  let bottom = (
    <div>
      {item.subItems.map((subitem, idx) => (
        <NavLink key={idx} tag={RouteNavLink} to={subitem.to}>
          {!hideLogoText && <span>{subitem.title}</span>}
        </NavLink>
      ))}
    </div>
  );

  return <CollapseModel top={top} bottom={bottom} />;
};

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
