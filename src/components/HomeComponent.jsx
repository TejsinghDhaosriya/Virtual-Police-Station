import React, {Component} from "react";
import FirComponent from "./FirComponent";

class HomeComponent extends Component{

    state = {
        fileFir: false,
        firStatus: false
    };

    constructor(props, context) {
        super(props, context);
    }

    makeFir = () => {
        console.log("file fir clickkd.")
        this.setState({fileFir: true});
    };

    render() {

        const styles = {
            fontSize: '40px'
        };

        return (
            <React.Fragment>
                {(this.state.fileFir) ? <FirComponent/> :
                    <div><h4 style={styles} className="text-center m-4">Welcome to Virtual Police Station</h4>
                        <h3 className="text-center">Below are the available options:</h3>
                        <div className="text-center mt-5">
                            <button onClick={this.makeFir} className="btn btn-primary btn-lg m-2">File an FIR</button>
                            <button className="btn btn-warning btn-lg m-2">FIR Status</button>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    };
}

export default HomeComponent;