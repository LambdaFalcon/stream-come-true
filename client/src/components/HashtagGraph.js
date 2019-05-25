import React from "react"
import ReactEcharts from "echarts-for-react";
// import echarts from 'echarts';

class Hashtags extends React.PureComponent{
    render(){
        return(
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        {this.props.name}
                    </div>
                    <div className="panel-body">
                    <HashtagGraph timefilter={this.props.timefilter} api={this.props.api} textfilter={this.props.textfilter} spidering={this.props.spidering} onNodeSpidering={this.props.onNodeSpidering}/>
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
        this.spidering = "";
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
        if (this.props.spidering !== prevProps.spidering) {
          this.fetchHashtagSpidering();
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

      fetchHashtagSpidering() {
        fetch(
          this.props.api + 
            `?textfilter=${this.props.textfilter || ""}` +
            (this.props.timefilter ? this.props.timefilter : "") +
            `&spidering=${this.props.spidering}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.props.spidering)     
          })
          .then(res => {
            return res;
          })
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: res
            })
          });
    }
    
      changeTextFilter(keyword) {
        const { onTextFilterChange } = this.props;
        onTextFilterChange(keyword);
      }

      onNodeSpidering(node) {
        const { onNodeSpidering } = this.props;
        onNodeSpidering(node);
      }

      handleClick = hashtagNode => {  
        // click on a node to expand the network
        var hashtag = hashtagNode.data.term;
        var exclude = this.state.data.vertices.filter(node => {
          return node.term !== hashtagNode.data.term
        }).map(node => {
          return node.term;
        });

        var obj = {
          hashtag: hashtag,
          exclude: exclude
        }
        this.setState({
          spidering: obj
        });
        
        this.onNodeSpidering(obj);
      };

    render() {
      const getOption = () =>({
        animationDuration: 2000,
        animationEasingUpdate: 'quadraticIn',
        color: '#157DEC'
      });
      const chart = this.graphRef.current;
      // if chart has been initialized and data exists
      if( chart !== null && this.state.data.vertices ){
        const mychart = chart.getEchartsInstance();
        if(this.state.data.vertices.length > 0){
          // add the rest of the properties
          mychart.setOption({
            title: {
              show: false
            },
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
              roam: true,
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
                  node.symbolSize = 10;
                  return node;
              }),
            edges: this.state.data.connections,
            animationDurationUpdate: 3000
            }]
          });
      }
       else {  
        mychart.clear()
        mychart.setOption({
          color: '#157DEC',
          title: {
            textStyle:{
              fontWeight: 'normal',
              fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
              color: 'grey',
              fontSize: 16
            },
            textVerticalAlign: 'middle',
            show: true,
            text: 'No data available'
          }
        });
    }
  }

    const onEvents = {
      'click': this.handleClick
    }

    return ( 
      <ReactEcharts ref={this.graphRef} option={getOption()} style={{ height: 300 }} onEvents={onEvents}/>
        );
    }
}
export default Hashtags;
