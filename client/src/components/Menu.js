import React from "react";
import Search from "./Search"
import DateTime from './DateTimePicker'
class Menu extends React.PureComponent {
   
    render() {
      return(
        <div className="navbar navbar-custom navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="navbar-brand">
                <span>STREAM</span>
                COMETRUE
              </div>
              <Search handler={this.props.handler}/>
              
              <div className="container">
                <DateTime/>
              </div>  
            </div>
          </div>
        </div>
      );
    }

    
  }
  export default Menu;