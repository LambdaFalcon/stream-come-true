//react library
import React from "react";
//importing the datetime-picker from react widgets library
import { DateTimePicker } from "react-widgets";
//importing moment and moment localizer to specify the format of the date
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
class DateTime extends React.PureComponent {
  constructor(props) {
    super(props);
    //It will save the dateto and the datefrom based on the component chnaged
    this.state = {
      datevalue: this.props.value
    };
  }
  //It will update the state of the component whenever a change in the state is seen
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        datevalue: this.props.value
      });
    }
  }
  /**
   * It renders the datetimepicker
   * onSelect it is the event called whenever we select a new option in the datepicker
   */
  render() {
    Moment.locale("en");
    momentLocalizer();
    const { datevalue } = this.state;
    const { handleTimeIntervalChangeObjectBased } = this.props;
    return (
      <DateTimePicker
        defaultValue={datevalue}
        disabled={this.props.disabled}
        value={this.state.datevalue}
        onChange={d => {
          //react complains if we dont havae an onchange
        }}
        onSelect={date => {
          let o = {};
          o[this.props.field] = date;
          handleTimeIntervalChangeObjectBased(o);
        }}
      />
    );
  }
}
/**
 * We expor the datetime picker to be visible by other javascript classes
 */
export default DateTime;
