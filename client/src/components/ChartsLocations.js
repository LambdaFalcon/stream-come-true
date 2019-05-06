import React from "react"
import OverTime from "./LineChart"
import BarVisual from "./BarChart"
import config from "../config"

const red_over_time = config['red_over_time'];
const twit_over_time = config['twit_over_time'];
const red_pop_key_words = config['red_pop_key_words'];
const twit_pop_key_words = config['twit_pop_key_words'];


class ChartsLocation extends React.Component{
    render(){
      return(
         <div>
            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-header col-lg-12">Charts</h1>
              </div>
            </div>
            <div className="col-lg-12">
            <OverTime name={"Twiter Data"} api={twit_over_time} textfilter={this.props.textfilter}/>
            <OverTime name={"Reddit Data"} api={red_over_time} textfilter={this.props.textfilter}/>
            </div>
            <div className="col-lg-12">
              <BarVisual name={"Twitter Popular Keywords"} api={twit_pop_key_words} textfilter={this.props.textfilter}/>
              <BarVisual name={"Reddit Popular Keywords"} api={red_pop_key_words} textfilter={this.props.textfilter}/>
            </div>
         </div>
      );
    }
  }
  export default ChartsLocation;