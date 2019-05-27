import React from "react";
import OverTime from "./LineChart";
import BarVisual from "./BarChart";
import config from "../config";
import Users from "./ListOfUsers";
import Hashtags from "./HashtagGraph";

// font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faReddit } from "@fortawesome/free-brands-svg-icons";

const red_over_time = config["red_over_time"];
const twit_over_time = config["twit_over_time"];
const red_pop_key_words = config["red_pop_key_words"];
const twit_pop_key_words = config["twit_pop_key_words"];
const red_user_over_time = config["red_user_over_time"];
const twit_user_over_time = config["twit_user_over_time"];
const red_pop_users = config["red_pop_users"];
const twit_pop_users = config["twit_pop_users"];
const reddit_data = config["reddit_data"];
const twit_data = config["twit_data"];
const hashtag_data = config["hashtag_data"];

class ChartsLocation extends React.Component {
  render() {
    const {
      textfilter,
      onChangeTimeInterval,
      timefilter,
      onTextFilterChange,
      spidering,
      onNodeSpidering
    } = this.props;

    const overTimeCountConfig = {
      name: "Count",
      color: "rgb(117,108,206)",
      dataKey: "count"
    };
    const positiveConfig = {
      name: "Positive",
      color: "rgb(36,175,161)",
      dataKey: "positive_count",
      stack: "one"
    };
    const negativeConfig = {
      name: "Negative",
      color: "rgb(253,201,12)",
      dataKey: "negative_count",
      stack: "one"
    };

    return (
      <div>
        <div className="row">
          <div className="col-lg-6">
            <div className="page-header text-center">
              <h2 style={{ verticalAlign: "middle" }}>
                <FontAwesomeIcon size="1x" icon={faTwitter} color={"#38A1F3"} />{" "}
                Twitter
              </h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="page-header text-center">
              <h2 style={{ verticalAlign: "middle" }}>
                <FontAwesomeIcon size="1x" icon={faReddit} color={"#FF4301"} />{" "}
                Reddit
              </h2>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <OverTime
            name={"Posts Over Time"}
            icon={
              <FontAwesomeIcon size="1x" icon={faTwitter} color={"#38A1F3"} />
            }
            api={twit_over_time}
            textfilter={textfilter}
            timefilter={timefilter}
            onChangeTimeInterval={onChangeTimeInterval}
            labelX={"Time"}
            labelY={"Count"}
            refreshing={this.props.refreshing}
            lines={[overTimeCountConfig]}
            bars={[positiveConfig, negativeConfig]}
          />
          <OverTime
            name={"Posts Over Time"}
            icon={
              <FontAwesomeIcon size="1x" icon={faReddit} color={"#FF4301"} />
            }
            api={red_over_time}
            textfilter={textfilter}
            timefilter={timefilter}
            onChangeTimeInterval={onChangeTimeInterval}
            labelX={"Time"}
            labelY={"Count"}
            refreshing={this.props.refreshing}
            lines={[overTimeCountConfig]}
            bars={[positiveConfig, negativeConfig]}
          />
        </div>
        <div className="col-lg-12">
          <BarVisual
            name={"Popular Keywords"}
            icon={
              <FontAwesomeIcon size="1x" icon={faTwitter} color={"#38A1F3"} />
            }
            api={twit_pop_key_words}
            timefilter={timefilter}
            textfilter={textfilter}
            x={"keyword"}
            y={"count"}
            onTextFilterChange={onTextFilterChange}
            labelX={"Keyword"}
            labelY={"Popularity"}
          />
          <BarVisual
            name={"Popular Keywords"}
            icon={
              <FontAwesomeIcon size="1x" icon={faReddit} color={"#FF4301"} />
            }
            api={red_pop_key_words}
            timefilter={timefilter}
            textfilter={textfilter}
            x={"keyword"}
            y={"count"}
            onTextFilterChange={onTextFilterChange}
            labelX={"Keyword"}
            labelY={"Popularity"}
          />
        </div>
        <div className="col-lg-12">
          <OverTime
            name={"Users Over Time"}
            icon={
              <FontAwesomeIcon size="1x" icon={faTwitter} color={"#38A1F3"} />
            }
            api={twit_user_over_time}
            timefilter={timefilter}
            textfilter={textfilter}
            onChangeTimeInterval={onChangeTimeInterval}
            labelX={"Time"}
            labelY={"Users"}
            lines={[overTimeCountConfig]}
          />
          <OverTime
            name={"Users Over Time"}
            icon={
              <FontAwesomeIcon size="1x" icon={faReddit} color={"#FF4301"} />
            }
            api={red_user_over_time}
            timefilter={timefilter}
            textfilter={textfilter}
            onChangeTimeInterval={onChangeTimeInterval}
            labelX={"Time"}
            labelY={"Users"}
            lines={[overTimeCountConfig]}
          />
        </div>
        <div className="col-lg-12">
          <BarVisual
            name={"Popular Users"}
            icon={
              <FontAwesomeIcon size="1x" icon={faTwitter} color={"#38A1F3"} />
            }
            api={twit_pop_users}
            timefilter={timefilter}
            textfilter={textfilter}
            onChangeTimeInterval={onChangeTimeInterval}
            x={"user"}
            y={"count"}
            labelX={"User"}
            labelY={"Popularity"}
          />
          <BarVisual
            name={"Popular Users"}
            icon={
              <FontAwesomeIcon size="1x" icon={faReddit} color={"#FF4301"} />
            }
            api={red_pop_users}
            timefilter={timefilter}
            textfilter={textfilter}
            onChangeTimeInterval={onChangeTimeInterval}
            x={"user"}
            y={"count"}
            labelX={"User"}
            labelY={"Popularity"}
          />
        </div>
        <div className="col-lg-12">
          <Users
            name={"Latest Posts"}
            icon={
              <FontAwesomeIcon size="1x" icon={faTwitter} color={"#38A1F3"} />
            }
            api={twit_data}
            textfilter={this.props.textfilter}
            timefilter={timefilter}
          />
          <Users
            name={"Latest Posts"}
            icon={
              <FontAwesomeIcon size="1x" icon={faReddit} color={"#FF4301"} />
            }
            api={reddit_data}
            textfilter={this.props.textfilter}
            timefilter={timefilter}
          />
        </div>
        <div className="col-lg-12">
          <Hashtags
            name={"Hashtag Network"}
            icon={
              <FontAwesomeIcon size="1x" icon={faTwitter} color={"#38A1F3"} />
            }
            api={hashtag_data}
            textfilter={this.props.textfilter}
            timefilter={timefilter}
            spidering={spidering}
            onNodeSpidering={onNodeSpidering}
            refreshing={this.props.refreshing}
          />
        </div>
      </div>
    );
  }
}
export default ChartsLocation;
