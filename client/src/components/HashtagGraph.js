import React from "react"
import ReactEcharts from "echarts-for-react";
// import echarts from 'echarts';

class Hashtags extends React.PureComponent{
    render(){
      const { textfilter, timefilter, refreshing } = this.props;
        return(
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        {this.props.name}
                    </div>
                    <div className="panel-body">
                    <HashtagGraph timefilter={timefilter} api={this.props.api} textfilter={textfilter} refreshing={refreshing}/>
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
          data: {},
          spidering: ""
        };
        this.textfilter = "";
      }
    
      componentDidMount() {
        this.fetchData();
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (this.props.textfilter !== prevProps.textfilter) {
          this.fetchData();
        }
        if (this.props.timefilter !== prevProps.timefilter) {
          this.fetchData();
        }
        if (this.state.spidering !== prevState.spidering) {
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
            `&spidering=${this.state.spidering}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.state.spidering)     
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

      setSpidering(obj) { 
        this.setState({
          spidering: obj
        });
      }

      handleClick = item => {  
        // click on a node to expand the network, only if not on Live mode
        if ( item.dataType !== 'edge' && !this.props.refreshing ) {
          const hashtag = item.data.term;
          const exclude = this.state.data.vertices.filter(node => {
            return node.term !== item.data.term
          }).map(node => {
            return node.term;
          });
          const obj = {
            hashtag: hashtag,
            exclude: exclude
          }
          this.setSpidering(obj);
        }  
      };

    render() {
      const getOption = () => ({
        animationDuration: 2000,
        animationEasingUpdate: 'quadraticIn',
        color: '#6A5ACD'
      });
      const chart = this.graphRef.current;
      // if chart has been initialized and data exists
      if ( chart !== null && this.state.data.vertices ) {
        const mychart = chart.getEchartsInstance();
        if ( this.state.data.vertices.length > 0 ) {
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
                      fontSize: 15,
                      show: true
                  }
              },
              draggable: true,
              roam: true,
              focusNodeAdjacency: true,
              force: {
                  initLayout: 'circular',
                  edgeLength: 100,
                  repulsion: 350,
                  gravity: 0.2
              },
              lineStyle: {
                normal: {
                    curveness: 0.1
                }
              },
              emphasis: {
                lineStyle: {
                    width: 10
                }
              },
              itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 15,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
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
          color: '#6A5ACD',
          title: {
            textStyle:{
              fontWeight: 'normal',
              fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
              color: 'grey',
              fontSize: 16
            },
            textVerticalAlign: 'middle',
            show: true,
            text: 'No networks available'
          }
        });
      }
    }

    const onEvents = {
      'click': this.handleClick
    }

    return ( 
      <ReactEcharts ref={this.graphRef} option={getOption()} style={{ height: 350 }} onEvents={onEvents}/>
      );
    }
}
export default Hashtags;
