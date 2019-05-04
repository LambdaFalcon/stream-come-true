import React from "react"
class MostWords extends React.Component{
    render(){
      return(
        <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.name}
          </div>
          <div className="panel-body">
          </div>
        </div>
      </div>
      );
    }
  }
export default MostWords;
  