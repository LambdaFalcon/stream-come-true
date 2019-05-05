import React from "react"
import OverTime from "./LineChart"
import MostWords from "./BarChart"
import config from "../config"


class ChartsLocation extends React.Component{
    render(){
      return(
         <div>
            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-header">Charts</h1>
              </div>
            </div>
            <div className="col-lg-12">
            <OverTime name={"Twiter Data"}/>
            <OverTime name={"Reddit Data"}/>
            </div>
            <div className="col-lg-12">
              <MostWords name={"Twitter Popular Keywords"}/>
              <MostWords name={"Reddit Popular Keywords"}/>
            </div>
         </div>
      );
    }
  }
  export default ChartsLocation;