import React from "react";
import Menu from "./components/Menu";
import Search from "./components/Search.js";
import ChartsLocation from "./components/ChartsLocations";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css"

class App extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();
    const fiveHoursAgo = new Date();
    fiveHoursAgo.setHours(fiveHoursAgo.getHours() - 5);

    this.state = {
      textfilter: "",
      //default [now-5h, now]
      fromdate: fiveHoursAgo,
      todate: now
    };
  }
  

  render() {
    var formStyle = {
      paddingRight: '3%',
      paddingTop: '1%'
    };
    
    return (
      <div className="App">
        <Menu
          handler={this.handleChange.bind(this)}
          onChangeTimeInterval={this.handleTimeIntervalChange.bind(this)}
          fromdate={this.state.fromdate}
          todate={this.state.todate}
        />
        <div className="row">
          <div className="col-md-6">  
          <h5><span>From: {this.state.fromdate.toLocaleString()}</span></h5>
          <h5><span>To: {this.state.todate.toLocaleString()}</span> </h5>
          </div>
          <div className="col-md-6">
          <form style={formStyle}> 
            <Search handler={this.handleChange.bind(this)} />
          </form>
          </div>
        </div>
        <ChartsLocation
          textfilter={this.state.textfilter}
          onChangeTimeInterval={this.handleTimeIntervalChange.bind(this)}
          timefilter={this.getTimeFilter()}
          onTextFilterChange={this.handleTextFilterChange.bind(this)}
        />
      </div>
    );
  }

  validDateRange(from, to) {
    return to - from > 0;
  }

  handleTimeIntervalChange(fromDateTime, toDateTime) {
    this.setState({
      fromdate: fromDateTime,
      todate: toDateTime
    });
  }

  getTimeFilter() {
    const { fromdate, todate } = this.state;

    if (!this.validDateRange(fromdate, todate)) {
      return "";
    }

    return `&fromdatetime=${fromdate.toISOString()}&todatetime=${todate.toISOString()}`;
  }

  handleChange(e) {
    this.setState({
      textfilter: e.target.value
    });
  }

  handleTextFilterChange(keyword) {
    this.setState({
      textfilter: keyword
    });
  }
}

export default App;
