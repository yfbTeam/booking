import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {userService} from "./api";
import {CheckLogin} from './api/api'
import Routes from './routes/index';
import Login from './containers/login'
import 'antd/dist/antd.css';
class App extends Component {
  render() {
    return (
        <div>loading</div>
    );
  }
  componentDidMount(){
    var that =this;
    CheckLogin(userService,(res)=>{
      if(res.status==='2'){
          ReactDOM.unmountComponentAtNode(document.getElementById('root'))
          ReactDOM.render(<Login/>,document.getElementById('root'))
      }else{
          ReactDOM.unmountComponentAtNode(document.getElementById('root'))
          window.initData = res.body
          ReactDOM.render(
              <Routes />,
              document.getElementById('root')
          )
      }
    },(err)=>{
      console.log(err);
    })
  }
}

export default App;
