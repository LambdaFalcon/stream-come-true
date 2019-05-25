import React from "react";

import Menu from "./components/Menu";
import ChartsLocation from "./components/ChartsLocations";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css"
import "react-widgets/dist/css/react-widgets.css";
import ToggleButton from "react-toggle-button";
import { DropdownList } from "react-widgets";


class App extends React.Component {
  constructor(props) {
    super(props);
    const refreshTimePeriod = 1000 * 60 * 10; //20 min
    const defaultPeriod = this.getRefreshDates(refreshTimePeriod);
    const selectablePeriods = [
      { label: "5 min", value: 1000 * 60 * 5 },
      { label: "10 min", value: 1000 * 60 * 10 },
      { label: "20 min", value: 1000 * 60 * 20 },
      { label: "30 min", value: 1000 * 60 * 30 },
      { label: "1 h", value: 1000 * 60 * 60 }
    ];

    this.state = {
      textfilter: "",
      ...defaultPeriod,
      refreshTimePeriod: refreshTimePeriod,
      refreshIntervalId: undefined,
      refreshing: true,
      selectablePeriods: selectablePeriods
    };
  }
  componentDidMount() {
    this.startRefreshing();
  }

  componentDidUnMount() {
    this.stopRefreshing();
  }
  //returns an object {todate: now, fromdate: now - refreshTimePeriod}
  getRefreshDates(refreshTimePeriod) {
    const to = new Date();
    const from = new Date(to - refreshTimePeriod);
    return {
      fromdate: from,
      todate: to
    };
  }
  render() {
    return (
      <div className="App">
        <Menu
          handler={this.handleChange.bind(this)}
          handleTimeIntervalChangeObjectBased={this.handleTimeIntervalChangeObjectBased.bind(this)}
          fromdate={this.state.fromdate}
          todate={this.state.todate}
          refreshing={this.state.refreshing}
          refreshControlls={this.getRefreshControls()}
        />
        <ChartsLocation
          textfilter={this.state.textfilter}
          onChangeTimeInterval={this.handleTimeIntervalChange.bind(this)}
          timefilter={this.getTimeFilter()}
          onTextFilterChange={this.handleTextFilterChange.bind(this)}
          refreshing={this.state.refreshing}
          spidering={this.state.spidering}
          onNodeSpidering={this.handleNodeSpidering.bind(this)}
        />
      </div>
    );
  }

  //start to refresh everything by changing the from and todatetime every
  //refreshTimePeriod/100 milliseconds
  startRefreshing() {
    const { refreshTimePeriod, refreshIntervalId } = this.state;
    //when we change the refresh period we need to clear the previous updating
    window.clearInterval(refreshIntervalId);
    //we set the refreshinterval to be period/100 because all aggregations return 100 buckets
    const refreshInterval = refreshTimePeriod / 100;
    const id = window.setInterval(() => {
      this.updateTimeFilter();
    }, refreshInterval);
    //update once immediately
    this.updateTimeFilter();
    this.setState({
      refreshIntervalId: id,
      refreshing: true
    });
  }

  //stops refreshing
  stopRefreshing() {
    let { refreshIntervalId } = this.state;
    window.clearInterval(refreshIntervalId);
    this.setState({
      refreshIntervalId: undefined,
      refreshing: false
    });
  }
  //toggles refreshing
  toggleRefreshing(value) {
    if (value) {
      this.stopRefreshing();
    } else {
      this.startRefreshing();
    }
  }
  updateTimeFilter() {
    const { refreshTimePeriod } = this.state;
    //when refreshing toDateTime is always now
    let newPeriod = this.getRefreshDates(refreshTimePeriod);
    this.setState({
      ...newPeriod
    });
  }

  //returns component with toggle and period selector
  getRefreshControls(){
    let periodSlection = [
      (<span key={1} style={{ marginLeft: 10, marginRight: 10 }}>Period:</span>),
      (<DropdownList
        data={this.state.selectablePeriods}
        style={{width:100}}
        disabled={!this.state.refreshing}
        value={this.state.refreshTimePeriod}
        key={2}
        onChange={item => {
          this.setState({ refreshTimePeriod: item.value }, () => {
            this.startRefreshing();
          });
        }}
        
        textField="label"
        valueField="value"
      />)]
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: 5 }}>Auto Refresh:</span>
          <ToggleButton
            value={this.state.refreshing}
            onToggle={value => {
              this.toggleRefreshing(value);
            }}
          />
          {this.state.refreshing? periodSlection: null}
          
        </div>
    )
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

  //expects ojects of the form {fromdate:date}, {todate:date}, {fromdate:date,todate:date }
  handleTimeIntervalChangeObjectBased(o) {
    this.setState({
      ...o
    });
  }


  getTimeFilter() {
    const { fromdate, todate } = this.state;

    if (!this.validDateRange(fromdate, todate)) {
      return "";
    }
    let params = `&fromdatetime=${fromdate.toISOString()}`;
    params += `&todatetime=${todate.toISOString()}`;
    return params;
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

  handleNodeSpidering(hashtagObj){
    this.setState({
      spidering: hashtagObj
    });
  }
}

export default App;
