import React from "react";
import Search from "./Search"
import DateTime from "./DateTime"

class Menu extends React.PureComponent {
   
    render() {
      return(
        <div className="navbar navbar-custom navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="row" style={{ display: "flex", alignItems: "center" }}>
                <div className="col-xs-2">
                <div className="navbar-brand">
                  <span>STREAM</span>
                  COMETRUE
                </div>
                </div>
                <div className="col-xs-3">
                  {this.props.refreshControlls}
                </div>
                <div className="col-xs-3">
                  <Search handler={this.props.handler.bind(this)} textfilter={this.props.textfilter}/>
                </div>
                <div className="col-xs-2">
                  <DateTime 
                    value={new Date(this.props.fromdate)}
                    field={"fromdate"}
                    disabled={this.props.refreshing}
                    handleTimeIntervalChangeObjectBased={this.props.handleTimeIntervalChangeObjectBased}
                  />
                </div>
                <div className="col-xs-2">
                    <DateTime
                      value={new Date(this.props.todate)}
                      field={"todate"}
                      disabled={this.props.refreshing}
                      handleTimeIntervalChangeObjectBased={this.props.handleTimeIntervalChangeObjectBased}
                    />
                </div> 
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  export default Menu;
