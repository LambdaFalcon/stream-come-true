import React from "react"
import OverTime from "./LineChart"
import BarVisual from "./BarChart"
import config from "../config"
import Users from "./ListOfUsers"

const red_over_time = config['red_over_time'];
const twit_over_time = config['twit_over_time'];
const red_pop_key_words = config['red_pop_key_words'];
const twit_pop_key_words = config['twit_pop_key_words'];
const red_user_over_time = config['red_user_over_time'];
const twit_user_over_time = config['twit_user_over_time'];
const red_pop_users = config['red_pop_users'];
const twit_pop_users = config['twit_pop_users'];
const reddit_data = config["reddit_data"];
const twit_data = config["twit_data"];
class ChartsLocation extends React.Component{
    render(){
      const {textfilter, onChangeTimeInterval} = this.props
      return(
         <div>
            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-header col-lg-12">Charts</h1>
              </div>
            </div>
            <div className="col-lg-12">
            <OverTime name={"Twitter Data"} api={twit_over_time} textfilter={textfilter} onChangeTimeInterval={onChangeTimeInterval} x={"time"} y={"count"}/>
            <OverTime name={"Reddit Data"} api={red_over_time} textfilter={textfilter} onChangeTimeInterval={onChangeTimeInterval} x={"time"} y={"count"}/>
            </div>
            <div className="col-lg-12">
              <BarVisual name={"Twitter Popular Keywords"} api={twit_pop_key_words} textfilter={textfilter} x={"keyword"} y={"count"}/>
              <BarVisual name={"Reddit Popular Keywords"} api={red_pop_key_words} textfilter={textfilter} x={"keyword"} y={"count"}/>
            </div>
            <div className="col-lg-12">
              <OverTime name={"Twitter Users Over Time"} api={twit_user_over_time} textfilter={textfilter} onChangeTimeInterval={onChangeTimeInterval} x={"time"} y={"count"}/>
              <OverTime name={"Reddit Users Over Time"} api={red_user_over_time} textfilter={textfilter} onChangeTimeInterval={onChangeTimeInterval} x={"time"} y={"count"}/>
            </div>
            <div className="col-lg-12">
              <BarVisual name={"Twitter Popular Users"} api={twit_pop_users} textfilter={textfilter} onChangeTimeInterval={onChangeTimeInterval} x={"user"} y={"count"}/>
              <BarVisual name={"Reddit Popular Users"} api={red_pop_users} textfilter={textfilter} onChangeTimeInterval={onChangeTimeInterval} x={"user"} y={"count"}/>
            </div>
            <div className="col-lg-12">
                <Users name={"Most 15 Users Twitter"} api={reddit_data} textfilter={this.props.textfilter} timefilter={"timefilter"}></Users>
                <Users name={"Most 15 Users Reddit"} api={twit_data} textfilter={this.props.textfilter} timefilter={"timefilter"}></Users>
            </div>
         </div>
      );
    }
  }
  export default ChartsLocation;