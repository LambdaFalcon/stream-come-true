import React from "react";
import "./css/bootstrap-table.css"
import "./css/bootstrap-theme.css"
import "./css/bootstrap-theme.css.map"
import "./css/bootstrap-theme.min.css"
import "./css/bootstrap-table.css"
import "./css/bootstrap-theme.min.css.map"
import "./css/bootstrap.css"
import "./css/bootstrap.min.css.map"
import "./css/datepicker3.css"
import "./css/styles.css"
import Menu from "./components/Menu"
import ChartsLocation from "./components/ChartsLocations"

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      textfilter: "",
      //default [now-5h, now]
      fromdate: new Date(new Date() -5*60*60*1000),
      todate: new Date()
    }
  }

  render() {
    return (
      <div className="App">
        <Menu handler={this.handleChange.bind(this )}/>
        <ChartsLocation textfilter={this.state.textfilter} onChangeTimeInterval={this.handleTimeIntervalChange.bind(this)} timefilter={this.getTimeFilter()}/>
      </div>
    );
  }
  handleTimeIntervalChange(fromDateTime, toDateTime){
    this.setState({
      fromdate:fromDateTime,
      todate: toDateTime
    })
  }
  getTimeFilter(){
    let {fromdate, todate} = this.state
    let val =  `&fromdatetime=${fromdate.toISOString()}&todatetime=${todate.toISOString()}`
    return val
  }
  handleChange(e){
    this.setState({
      textfilter: e.target.value
    })
  }
}

export default App;
