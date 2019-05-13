import React from "react"
class DateTime extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            date_value:""
        }
    }
    
    render() {
        return(
            <div className="row">
            <div className='col-sm-6'>
                <div className="form-group">
                    <div className='input-group date' id='datetimepicker1'>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default DateTime;
