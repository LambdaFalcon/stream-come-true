import React from "react";
import { Markup } from "interweave";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter, faReddit } from "@fortawesome/free-brands-svg-icons";
library.add(faTwitter, faReddit);

class Users extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="col-xs-6">
          <div className="panel panel-default">
            <div className="panel-heading">
              {this.props.icon} {this.props.name}
            </div>
            <div
              className="panel-body"
              style={{ height: 500, overflowY: "scroll" }}
            >
              <List
                api={this.props.api}
                timefilter={this.props.timefilter}
                textfilter={this.props.textfilter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timefilter: "",
      textfilter: " ",
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.textfilter !== prevProps.textfilter ||
      this.props.timefilter !== prevProps.timefilter
    ) {
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

  userData = data => {
    for (let i = 0; i < this.state.data.length; i++) {}
  };

  styles1 = {
    margin: "auto",
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    height: "auto",
    backgroundColor: "#eff1f4",
    border: "1px solid",
    borderColor: "#c5c8cc",
    borderRadius: "5px"
  };

  //returns color and icon depending on sentiment
  getStyleForSentiment(sentiment) {
    let ret;
    if (sentiment < 0.3) {
      ret = {
        color: "red",
        icon: "frown"
      };
    } else if (sentiment < 0.7) {
      ret = {
        color: "orange",
        icon: "meh"
      };
    } else {
      ret = {
        color: "green",
        icon: "smile"
      };
    }
    return ret;
  }

  render() {
    return this.state.data.map((user, index) => {
      let styleForSentiment = this.getStyleForSentiment(user.sentiment);
      return (
        <div
          className="row"
          style={{ ...this.styles1, borderColor: styleForSentiment.color }}
          key={index}
        >
          <div className="col-sm-6 col-md-3">
            <img
              src={user["user_image"]}
              width={"50px"}
              height={"50px"}
              alt={"user profile"}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h6>{user["screen_name"]} </h6>
            <FontAwesomeIcon
              data-tip={`${(user.sentiment * 100).toFixed(2)}% positive`}
              size="2x"
              icon={styleForSentiment.icon}
              color={styleForSentiment.color}
            />
          </div>
          <hr />
          <div>
            <h6>{new Date(user["created_at"]).toLocaleString()}</h6>
          </div>
          <div>
            <Markup content={user["text"]} />
          </div>
          <ReactTooltip />
        </div>
      );
    });
  }
}
export default Users;
