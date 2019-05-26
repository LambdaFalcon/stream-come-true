import React from "react";
import ReactEcharts from "echarts-for-react";
// import echarts from 'echarts';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter, faReddit } from "@fortawesome/free-brands-svg-icons";
library.add(faTwitter, faReddit);

class Hashtags extends React.PureComponent {
  render() {
    const { textfilter, timefilter, refreshing, api } = this.props;
    return (
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.icon} {this.props.name}
          </div>
          <div className="panel-body">
            <HashtagGraph
              id="networkg"
              timefilter={timefilter}
              api={api}
              textfilter={textfilter}
              refreshing={refreshing}
            />
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
      })
      .catch(console.log);
  }

  fetchHashtagSpidering() {
    fetch(
      this.props.api +
        `?textfilter=${this.props.textfilter || ""}` +
        (this.props.timefilter ? this.props.timefilter : ""),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.spidering)
      }
    )
      .then(res => {
        return res;
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: HashtagGraph.mergeGraph(this.state.data, res)
        });
      })
      .catch(console.log);
  }

  /**
   * Merge a given graph with another graph which is an extension of it,
   * spidering out from one of its vertices.
   *
   * @private
   * @param {Graph} currentGraph
   * @param {Graph} graphSpidering
   * @returns {Graph} merged graph
   */
  static mergeGraph(currentGraph, graphSpidering) {
    if (graphSpidering.vertices.length === 0) return currentGraph;

    // Number of vertices in current graph
    const currentGraphLength = currentGraph.vertices.length;

    // Index of spidering source in new graph part and in current graph
    const newSpideringSourceIndex = graphSpidering.vertices.findIndex(
      v => v.depth === 0
    );
    const currentSpideringSourceIndex = currentGraph.vertices.findIndex(
      v => v.term === graphSpidering.vertices[newSpideringSourceIndex].term
    );

    // Remove existing vertex form new vertices (spidering source)
    const spideringNewVertices = graphSpidering.vertices.filter(
      (_v, i) => i !== newSpideringSourceIndex
    );

    // Map new connections to correct indices (either original source index or add current vertices length)
    const newConnections = graphSpidering.connections.map(conn => ({
      ...conn,
      source:
        conn.source === newSpideringSourceIndex
          ? currentSpideringSourceIndex
          : conn.source +
            currentGraphLength -
            (conn.source > newSpideringSourceIndex ? 1 : 0),
      target:
        conn.target === newSpideringSourceIndex
          ? currentSpideringSourceIndex
          : conn.target +
            currentGraphLength -
            (conn.target > newSpideringSourceIndex ? 1 : 0)
    }));

    return {
      vertices: [...currentGraph.vertices, ...spideringNewVertices],
      connections: [...currentGraph.connections, ...newConnections]
    };
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
    if (item.dataType !== "edge" && !this.props.refreshing) {
      const hashtag = item.data.term;
      const exclude = this.state.data.vertices
        .filter(node => {
          return node.term !== item.data.term;
        })
        .map(node => {
          return node.term;
        });
      const obj = {
        hashtag: hashtag,
        exclude: exclude
      };
      this.setSpidering(obj);
    }
  };

  render() {
    const getOption = () => ({
      animationDuration: 2000,
      animationEasingUpdate: "quadraticIn",
      color: "#6A5ACD"
    });
    const chart = this.graphRef.current;
    // if chart has been initialized and data exists
    if (chart !== null && this.state.data.vertices) {
      const mychart = chart.getEchartsInstance();
      if (this.state.data.vertices.length > 0) {
        // add the rest of the properties
        mychart.setOption({
          title: {
            show: false
          },
          series: [
            {
              type: "graph",
              layout: "force",
              animation: false,
              label: {
                normal: {
                  position: "right",
                  formatter: "{b}",
                  fontSize: 15,
                  show: true
                }
              },
              draggable: true,
              roam: true,
              focusNodeAdjacency: true,
              force: {
                initLayout: "circular",
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
                  borderColor: "#fff",
                  borderWidth: 1,
                  shadowBlur: 15,
                  shadowColor: "rgba(0, 0, 0, 0.3)"
                }
              },
              data: this.state.data.vertices.map(function(node, index) {
                node.id = index;
                node.name = node.term.replace("#", "");
                node.symbolSize = 10;
                return node;
              }),
              edges: this.state.data.connections.map(conn => ({
                ...conn,
                lineStyle: {
                  type: "solid",
                  width: 1 + Math.sqrt(conn.weight) * 10
                }
              })),
              animationDurationUpdate: 3000
            }
          ]
        });
      } else {
        mychart.clear();
        mychart.setOption({
          color: "#6A5ACD",
          title: {
            textStyle: {
              fontWeight: "normal",
              fontFamily: '"Montserrat", Arial, Helvetica, sans-serif',
              color: "grey",
              fontSize: 16
            },
            textVerticalAlign: "middle",
            show: true,
            text: "No networks available"
          }
        });
      }
    }
    const onEvents = {
      click: this.handleClick
    };

    return (
      <ReactEcharts
        ref={this.graphRef}
        option={getOption()}
        style={{ height: 500 }}
        onEvents={onEvents}
      />
    );
  }
}
export default Hashtags;
