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
import Search from "./components/Search"
import ChartsLocation from "./components/ChartsLocations"

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      textfilter: ""
    }
  }
  render() {
    return (
      <div className="App">
        <Menu/>
        <Search handler={this.handleChange.bind(this)}/>
        <ChartsLocation textfilter={this.state.textfilter}/>
      </div>
    );
  }

  handleChange(e){
    this.setState({
      textfilter: e.target.value
    })
  }
}

export default App;
