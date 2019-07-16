import React from "react";
import { Nav, NavItem, NavLink } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store, Constants, Dispatcher } from "../../../flux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: Store.getSidebarItems(),
      menuVisivle: Store.getMenuState()
    };

    this.onChange = this.onChange.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
    this.handleOpenSidebar = this.handleOpenSidebar.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(Constants.CHANGE, this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.CHANGE, this.onChange);
  }

  handleCloseSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.CLOSE_SIDEBAR
    });
  }

  handleOpenSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.OPEN_SIDEBAR
    });
  }
  onChange() {
    this.setState({
      ...this.state,
      menuVisivle: Store.getMenuState()
    });
  }

  render() {
    const { navItems: items } = this.state;
    const icon = this.state.menuVisivle ? "apps" : "fast_rewind";
    return (
      <div
        onMouseEnter={this.handleOpenSidebar}
        onMouseLeave={this.handleCloseSidebar}
        className="nav-wrapper"
      >
        <Nav className="text-center nav--no-borders flex-column">
          <NavItem style={{ cursor: "pointer" }}>
            <NavLink>
              {
                <div
                  className="  item-icon-wrapper"
                  dangerouslySetInnerHTML={{
                    __html: `<i class="material-icons">${icon} </i>`
                  }}
                />
              }
            </NavLink>
          </NavItem>
          {items.map((item, idx) => (
            <SidebarNavItem
              hideLogoText={this.state.menuVisivle}
              key={idx}
              item={item}
            />
          ))}
        </Nav>
      </div>
    );
  }
}

export default SidebarNavItems;
