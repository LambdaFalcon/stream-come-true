import React from "react";

import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";

import JqxBarGauge from "jqwidgets-scripts/jqwidgets-react-tsx/jqxbargauge";

class LineChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tooltip: {
        formatFunction(value) {
          return "Year: 2016 Price Index:" + value;
        },
        visible: true
      },
      values: [10, 20, 30, 40, 50]
    };
  }

  render() {
    return (
      <JqxBarGauge
        width={600}
        height={600}
        max={60}
        colorScheme={"scheme02"}
        values={this.state.values}
        tooltip={this.state.tooltip}
      />
    );
  }
}

export default LineChart;
