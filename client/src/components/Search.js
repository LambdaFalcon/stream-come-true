
import React from "react";
class Search extends React.PureComponent {
  /**
   * Constructor for the react class
   * It takes the props from the parent
   * The state of the input will match to the state of the texfilter
   * At first the state of the component will be an mpty string 
   * since the textfilter will be an empty string 
   */
  constructor(props) {
    super(props);
    const {textfilter} = this.props
    this.state = {
      input: textfilter
    };
  } 
  /**
   * 
   * function called when the state of the current component
   * has changed
   * It check if the previous state is the same with the changed state
   * If not you update the state 
   */
  componentDidUpdate(prevState){
    const{input} = this.state;
    const {textfilter} = this.props;
    if(prevState.input !== input){
      this.setState({
        input: textfilter
      })
    }
  }
  /**
   * function that render the React component 
   * based on html syntax
   */
  render() {
    const {input} = this.state
    return (
      <div className="form-group">
        <input
          type="text"
          className="form-control input-md"
          placeholder="Keyword"
          value={input}
          onChange={this.props.handler}
        />
      </div>

    );
  }
}
//In order to import class in other javascript files.
export default Search;
