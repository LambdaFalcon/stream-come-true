import React from "react";
class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  render() {
    return (

        <input
          type="text"
          className="form-control input-md"
          placeholder="Keyword"
          onChange={this.props.handler}
        />

    );
  }
}
export default Search;
