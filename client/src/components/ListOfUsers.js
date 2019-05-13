import React from "react"
class Users extends React.PureComponent{
    render(){
        return(
            <div>
                <div className="col-xs-6">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.props.name}
                        </div>
                        <div className="panel-body">
                            <List api={this.props.api} textfilter={this.props.textfilter}/>
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
    fetch(this.props.api)
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

  render() {
    return this.state.data.map(i => (
      <div className="row">
        <div className="col-sm-6 col-md-3">
          <img
            src={i["user_image"]}
            width={"50px"}
            height={"50px"}
            alt={"user profile"}
          />
        </div>
        <div>
        <h6>{i["created_at"]}</h6>
        </div>
      </div>
    ));
  }
}
export default Users;