import React from "react";
import Search from "./Search.js";

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fromdate: this.props.fromdate,
      todate: this.props.todate
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { fromdate, todate } = this.state;
    if (prevState.fromdate !== fromdate || prevState.todate !== todate) {
      this.props.onChangeTimeInterval(fromdate, todate);
    }
  }

  render() {
    return (
      <div className="navbar navbar-custom navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header pull-left navbar-left">
            <div className="navbar-brand">
              <span>STREAM</span>
              COMETRUE
            </div>
          </div>
          <div className="pull-right nav navbar-right">
            <Search handler={this.props.handler.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
