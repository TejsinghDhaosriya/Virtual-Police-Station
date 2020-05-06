import React, {Component} from "react";
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import {func} from "prop-types";
import HomeComponent from "./HomeComponent";

class LoginComponent extends Component{

    constructor(props: P, context: any) {
        super(props, context);
        this.state={
            aadhar_no: "",
            mobile_no: "",
            captchaFlag: true,
            smsCode: "",
            confirmationResult: {},
            success: false,
        }
    }

    componentDidMount() {
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': function(response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // onSignInSubmit();
            }
        });

    }

    onSignInSubmit = (confirmationResult) => {
        this.setState({success: true});
        console.log("onSingInSubmit.");
        var code = this.state.code;
        // confirmationResult.confirm(code).then(function (result) {
        //     // User signed in successfully.
        //     console.log("signed up successfully");
        //
        //     // var user = result.user;
        //     // ...
        // }).catch(function (error) {
        //     // User couldn't sign in (bad verification code?)
        //     // ...
        // });

    };

// sendOtp = () => {
    //     var phoneNumber = getPhoneNumberFromUserInput();
    //     firebase.auth().signInWithPhoneNumber(phoneNumber)
    //         .then(function (confirmationResult) {
    //             // SMS sent. Prompt user to type the code from the message, then sign the
    //             // user in with confirmationResult.confirm(code).
    //             window.confirmationResult = confirmationResult;
    //         }).catch(function (error) {
    //         // Error; SMS not sent
    //         // ...
    //     });
    // };

    onHandleSubmit = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        var code = this.state.smsCode;

        var phoneNumber = this.state.mobile_no;
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;


            }).catch(function (error) {
                // grecaptcha.reset(window.recaptchaWidgetId);

            // Error; SMS not sent
            // ...
        });

        console.log(window.confirmationResult);





    };



    render(){
        return (
            <React.Fragment>{
                this.state.success ? <HomeComponent/> :
                    <div><h1 style={{textAlign: 'center'}}>Login</h1>
                    <div className="d-flex justify-content-center">
                <form className="body">
                <div className="form-group col-md-6">
                <label htmlFor="inputAddress">Aadhar No</label>
                <input type="text" className="form-control" id="inputAddress" placeholder=""
                value={this.state.aadhar_no}
                onChange={(e) => { this.setState({aadhar_no: e.currentTarget.value})} }
                style={{width: "500px"}}
                />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputAddress2">Mobile No.</label>
                <input type="text" className="form-control" id="mobile_no" placeholder=""
                value={this.state.mobile_no}
                onChange={(e) => { this.setState({mobile_no: e.currentTarget.value})} }
                style={{width: "500px"}}/>
                </div>
                <div className="form-group">

                <div style={{textAlign: 'center'}}>
                <button id="sign-in-button" onClick={this.onHandleSubmit} type="button" className="btn btn-info col-md-2">Submit
                </button>
                </div>
                </div>
                <div id="recaptcha-container" style={{textAlign: 'center'}}>

                </div>
                <div id="code" style={{textAlign: 'center'}}>
                <label>Enter Code:</label><br/>
                <input
                value={this.state.smsCode}
                onChange={(e) => {this.setState({smsCode: e.currentTarget.value})}}
                type="text"/>
                <button
                onClick={this.onSignInSubmit}
                className="ml-2">Submit</button>
                </div>
                </form>
                </div>
                    </div>
            }
            </React.Fragment>


        );
    }
}

export default LoginComponent;