import React from "react";
class Search extends React.PureComponent {
    constructor(props){
      super(props)
      this.state = {    
          input: "" 
      }
    }
    render() {
      return(
            <div className="input-group">
          <input id="btn-input" type="text" className="form-control input-md" placeholder="Keyword" onChange={this.props.handler}>
          </input>
        </div>
      );
    }
  }
  export default Search;