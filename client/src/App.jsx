import React from "react";
import "./App.css";

import Main from "./components/Main";
import config from "./config";

const { api } = config;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { testApiResponse: "" };
  }

  callAPI() {
    fetch(`${api}/testAPI`)
      .then(res => res.text())
      .then(res => this.setState({ testApiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <Main />
        <footer>{this.state.testApiResponse}</footer>
      </div>
    );
  }
}

export default App;
