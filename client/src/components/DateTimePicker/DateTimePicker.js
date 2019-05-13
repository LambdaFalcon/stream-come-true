import React from "react";
import "./DateTimePicker.css";

class DateTime extends React.PureComponent {
  render() {
    //datetime-local only works on chrom
    return (
      <input
        id="date-input"
        type="datetime-local"
        className="form-control input-md date-picker"
        placeholder="Keyword"
        onChange={this.props.handler}
        value={this.props.value.toISOString().slice(0, -5)}
      />
    );
  }
}

export default DateTime;
