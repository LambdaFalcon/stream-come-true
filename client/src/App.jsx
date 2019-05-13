import React from "react";
import "./css/bootstrap-table.css";
import "./css/bootstrap-theme.css";
import "./css/bootstrap-theme.css.map";
import "./css/bootstrap-theme.min.css";
import "./css/bootstrap-table.css";
import "./css/bootstrap-theme.min.css.map";
import "./css/bootstrap.css";
import "./css/bootstrap.min.css.map";
import "./css/datepicker3.css";
import "./css/styles.css";
import Menu from "./components/Menu";
import ChartsLocation from "./components/ChartsLocations";

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
    return (
      <div className="App">
        <Menu
          handler={this.handleChange.bind(this)}
          onChangeTimeInterval={this.handleTimeIntervalChange.bind(this)}
          fromdate={this.state.fromdate}
          todate={this.state.todate}
        />
        <div className="navbar-brand ">
          <span>From: {this.state.fromdate.toLocaleString()}</span>
        </div>
        <div className="navbar-brand">
          <span>To: {this.state.todate.toLocaleString()}</span>
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
