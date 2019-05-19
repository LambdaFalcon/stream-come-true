import React from "react";
import Search from "./Search.js";
/**
 * This class is responsible for showing the navigation component in React
 */
class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    /*
     * It takes and it shows the current dates passed from the root parent
    */
    this.state = {
      fromdate: this.props.fromdate,
      todate: this.props.todate,
    };
  }
  /*
   * It changes updates the state of the component accordingly
  */
  componentDidUpdate(prevProps, prevState) {
    const { fromdate, todate } = this.state;
    if (prevState.fromdate !== fromdate || prevState.todate !== todate) {
      this.props.onChangeTimeInterval(fromdate, todate);
    }
  }
  /*
   * Rneders the react states accordingly
  */
  render() {
    const{handler,textfilter} = this.props;
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
            <Search handler={handler} textfilter={textfilter}/>
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
