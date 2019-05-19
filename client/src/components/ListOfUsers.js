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
                            <List api={this.props.api} timefilter={this.props.timefilter} textfilter={this.props.textfilter}/>
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
    fetch(this.props.api +
      `?textfilter=${this.props.textfilter || ""}` +
      (this.props.timefilter ? this.props.timefilter : ""))
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
    margin: 'auto',
    marginBottom:"10px",
    padding: '10px',
    width: '100%',
    height: 'auto',
    backgroundColor: '#eff1f4',
    border:"1px solid",
    borderColor:"#c5c8cc",
    borderRadius:"5px"
  };

  render() {
    return this.state.data.map((user, index) => (
    <div className="row" style={this.styles1} key={index}>
        <div className="col-sm-6 col-md-3">
          <img
            src={user["user_image"]}
            width={"50px"}
            height={"50px"}
            alt={"user profile"}
          />
        </div>
        <div>
        <h6>{user["screen_name"]}</h6>
        </div>
        <hr/>
        <div>
            <h6>{new Date(user["created_at"]).toLocaleString()}</h6>
        </div>
        <div>
            <p>
                {user["text"]}
            </p>
        </div>
    </div>
    ));
  }
}
export default Users;