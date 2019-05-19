import React from "react"
import ReactEcharts from "echarts-for-react";
// import echarts from 'echarts';

class Hashtags extends React.PureComponent{
    render(){
        return(
            <div>
                <div className="col-xs-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.props.name}
                        </div>
                        <div className="panel-body">
                        <HashtagGraph id='networkg' timefilter={this.props.timefilter} api={this.props.api} textfilter={this.props.textfilter}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class HashtagGraph extends React.Component {
    constructor(props) {
        super(props);
        this.graphRef = React.createRef();
        this.state = {
          data: {}
        };
        this.textfilter = "";
      }
    
      componentDidMount() {
        this.fetchData();
      }
    
      componentDidUpdate(prevProps) {
        if (this.props.textfilter !== prevProps.textfilter) {
          this.fetchData();
        }
        if (this.props.timefilter !== prevProps.timefilter) {
          this.fetchData();
        }
      }
    
      fetchData() {
        fetch(
          this.props.api +
            `?textfilter=${this.props.textfilter || ""}` +
            (this.props.timefilter ? this.props.timefilter : "")
        )
          .then(res => {
            return res;
          })
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: res
              
            });
          });
      }
    
      changeTextFilter(keyword) {
        const { onTextFilterChange } = this.props;
        onTextFilterChange(keyword);
      }

    render() {
      const getOption = () =>({
        animationDurationUpdate: 1600,
        animationEasingUpdate: 'quinticInOut',
        color: '#157DEC'
      });
      const chart = this.graphRef.current;
      
      // if chart has been initialized and data exists
      if( chart !== null && this.state.data.vertices ){
        const mychart = chart.getEchartsInstance();
        // add the rest of the properties
        mychart.setOption({
          series : [{
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
                normal: {
                    position: 'right',
                    formatter: '{b}',
                    show: true
                }
            },
            draggable: true,
            focusNodeAdjacency: true,
            force: {
                initLayout: 'circular',
                edgeLength: 100,
                repulsion: 300,
                gravity: 0.2
            },
            data: this.state.data.vertices.map(function (node, index) {
              node.id = index;
              node.name = node.term.replace('#','');
              node.symbolSize = 18;
              return node;
            }),
          edges: this.state.data.connections
        }] 
      });
    }
    return (  
      <ReactEcharts ref={this.graphRef} option={getOption()} style={{ height: 300 }}/>
        );
    }
}
export default Hashtags;
