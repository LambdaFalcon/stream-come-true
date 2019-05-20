import React from "react";
import OverTime from "./LineChart";
import BarVisual from "./BarChart";
import config from "../config";
import Users from "./ListOfUsers";
import Hashtags from "./HashtagGraph";

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
      onTextFilterChange
    } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header col-lg-12">Charts</h1>
          </div>
        </div>
        <div className="col-lg-12">
          <OverTime
            name={"Twitter Data"}
            api={twit_over_time}
            textfilter={textfilter}
            timefilter={timefilter}
            onChangeTimeInterval={onChangeTimeInterval}
            x={"time"}
            y={"count"}
            labelX={"Time"}
            labelY={"Count"}
            sentiment={true}
            refreshing={this.props.refreshing}
          />
          <OverTime
            name={"Reddit Data"}
            api={red_over_time}
            textfilter={textfilter}
            timefilter={timefilter}
            onChangeTimeInterval={onChangeTimeInterval}
            x={"time"}
            y={"count"}
            labelX={"Time"}
            labelY={"Count"}
            sentiment={true}
            refreshing={this.props.refreshing}
          />
        </div>
        <div className="col-lg-12">
          <BarVisual
            name={"Twitter Popular Keywords"}
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
            name={"Reddit Popular Keywords"}
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
            name={"Twitter Users Over Time"}
            api={twit_user_over_time}
            timefilter={timefilter}
            textfilter={textfilter}
            onChangeTimeInterval={onChangeTimeInterval}
            x={"time"}
            y={"count"}
            labelX={"Time"}
            labelY={"Users"}
          />
          <OverTime
            name={"Reddit Users Over Time"}
            api={red_user_over_time}
            timefilter={timefilter}
            textfilter={textfilter}
            onChangeTimeInterval={onChangeTimeInterval}
            x={"time"}
            y={"count"}
            labelX={"Time"}
            labelY={"Users"}
          />
        </div>
        <div className="col-lg-12">
          <BarVisual
            name={"Twitter Popular Users"}
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
            name={"Reddit Popular Users"}
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
            name={"Latest Posts Twitter"}
            api={twit_data}
            textfilter={this.props.textfilter}
            timefilter={timefilter}
          />
          <Users
            name={"Latest Posts Reddit"}
            api={reddit_data}
            textfilter={this.props.textfilter}
            timefilter={timefilter}
          />
        </div>
        <div className="col-lg-12">
          <Hashtags
            name={"Hashtag Network"}
            api={hashtag_data}
            textfilter={this.props.textfilter}
            timefilter={timefilter}
          />
        </div>
      </div>
    );
  }
}
export default ChartsLocation;
