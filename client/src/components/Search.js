import React from "react";
class Search extends React.PureComponent {
  /**
   * 
   * So in the begining the textfilter will be empty 
   */
  constructor(props) {
    super(props);
    const {textfilter} = this.props
    this.state = {
      input: textfilter
    };
  }
  componentDidUpdate(prevState){
    const{input} = this.state
    const {textfilter} = this.props
    if(prevState.input !== input){
      this.setState({
        input: textfilter
      })
    }
  }

  render() {
    const {input} = this.state
    console.log(input)
    return (
        <input
          type="text"
          className="form-control input-md"
          placeholder="Keyword"
          value={input}
          onChange={this.props.handler}
        />
    );
  }
}
export default Search;
