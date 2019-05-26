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
    const { textfilter } = this.props;
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
  componentDidUpdate(prevState) {
    const { input } = this.state;
    const { textfilter } = this.props;
    if (prevState.input !== input) {
      this.setState({
        input: textfilter
      });
    }
  }

  /**
   * Handle key down event on input field and call
   * hanler of props only if enter key is pressed.
   *
   * @param {Event} e keyDown event
   */
  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.props.handler(e);
    }
  }

  /**
   * Render the search input field.
   */
  render() {
    const { input } = this.state;
    return (
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Keyword"
          value={input}
          onKeyDown={this.handleKeyDown.bind(this)}
          onBlur={this.props.handler}
        />
      </div>
    );
  }
}
//In order to import class in other javascript files.
export default Search;
