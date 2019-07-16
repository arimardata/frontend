import React from "react";
import { Button, Collapse, NavItem } from "shards-react";
// import Collapse from "shards-react/collapse";

/**
 * ## Basic Example
 */
export default class CollapseModel extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div>
        <div onClick={this.toggle}>{this.props.top}</div>
        <Collapse open={this.state.collapse}>
          <div className="ml-5 ">{this.props.bottom}</div>
        </Collapse>
      </div>
    );
  }
}
