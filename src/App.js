import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";

class App extends Component{

    constructor(props: P, context: any) {
        super(props, context);
        this.state= {
            loginFlag: true
        }
    }

    render() {
    return (
        <React.Fragment>
        <main className="container">
            {this.state.loginFlag ? <LoginComponent/> :
            <HomeComponent/>}
        </main>
        </React.Fragment>
    );
  }
}

export default App;
