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
      <div class="form-group">
        <input
          type="text"
          className="form-control input-md"
          placeholder="Keyword"
          onChange={this.props.handler}
        />
      </div>

    );
  }
}
export default Search;
