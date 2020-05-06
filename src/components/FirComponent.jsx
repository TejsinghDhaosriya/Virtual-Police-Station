import React, {Component} from "react";
import HomeComponent from "./HomeComponent";
import Modal from 'react-modal';
import axios from 'axios';

class FirComponent extends Component{

    componentWillMount() {
        Modal.setAppElement(document.getElementById('root'));
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            modalIsOpen: false,
            date: (new Date()).toString().split(' ').splice(1,3).join(' '),
            backBtn: false,
            name: "",
            address: "",
            mobile: "",
            email: "",
            subject: "",
            incident: "",
            police_station_name: "",
            police_station_address: "",
            police_station_pin: ""
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});

        // axios.post('http://localhost:8081/confirmFIR', this.state.name)
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     })
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#000';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    getDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        this.setState({date: today});
    };

    submitFir = () => {
        console.log(this.state.name);
        console.log(this.state.address);
        console.log("submitted fir.");
        console.log(this.state.date);

        this.setState({subject: "FIR Related to " + this.state.subject});
        console.log(this.state.subject);

        axios({
            method: 'post',
            url: 'http://localhost:8081/generateFIR',
            data: {name: this.state.name,
                    address: this.state.address,
                mobile: this.state.mobile,
                email: this.state.email,
                date: this.state.date,
                subject: this.state.subject,
                incident: this.state.incident,
                police_station_name: this.state.police_station_name,
                police_station_address: this.state.police_station_address,
                police_station_pin: this.state.police_station_pin,
                applicant_name: this.state.name

            },
            // headers: {'Content-Type': 'text/html' }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.closeModal();
        });
        // var formData = new FormData();
        // formData.set('name', this.state.name);
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:8081/generateFIR',
        //     data: {name:this.state.name},
        //     //headers: {'Content-Type': 'text/html' }
        // }).then(res => {
        //     console.log(res);
        //     console.log(res.data);
        //     this.closeModal()
        //
        // });
        // axios.post("http://localhost:8081/generateFIR")
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     })
    };

    render() {
        const styles = {
            marginTop: '50px',
        };

        const customStyles = {
            content : {
                top                   : '25%',
                left                  : '50%',
                right                 : '50%',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };

        return (
            <React.Fragment>
                {(this.state.backBtn) ? <HomeComponent/> :
                <div>
                    <button onClick={() => {
                        this.setState({backBtn: true})
                    }} id="backBtn" className="btn btn-info mt-4">Back</button>
                    <h4 style={{marginTop: '20px'}}>Fill up the details below: </h4>
                    {/*<button onClick={this.openModal} className="btn btn-primary">Open Modal</button>*/}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Confirm FIR Modal"
                    >

                        {/*<h2 ref={subtitle => this.subtitle = subtitle}>Submit*/}
                        {/*</h2>*/}
                        <div>Are you sure you want to Submit?
                            Information Entered once cannot be changed.
                            Please check the entered information carefully.</div>
                        <button className="btn btn-secondary btn-sm m-2" onClick={this.closeModal}>close</button>
                        <button className="btn btn-success btn-sm ml-2" onClick={this.submitFir}>Submit</button>
                    </Modal>

                    <form onSubmit={this.openModal}>
                        <div className="form-group">
                            <label>
                                Name:<br/>                            </label>

                            <input id="name" type="text" name="name" className="form-control" placeholder="Applicant’s Name or Father’s/Husband’s Name"
                                value={this.state.name} onChange={(e) => {this.setState({name: e.currentTarget.value})}}
                                />
                            <br/>

                            <label>
                                Nature of Offence:<br/>
                            </label>
                            <select value={this.state.subject} onChange={(e) => {this.setState( {subject: e.currentTarget.value})}} id="inputState" className="form-control">
                                <option selected>Choose...</option>
                                <option>theft</option>
                                <option>murder</option>
                                <option>rape</option>
                                <option>vehicle theft</option>
                                <option>mobile thef</option>
                            </select>
                            <br/>

                            <label>
                                Details of the Incident:
                            </label><br/>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      value={this.state.incident} onChange={(e) => {this.setState( {incident: e.currentTarget.value})}}
                            />
                            <br/>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label >Nearest Police Station Name</label>
                                    <input
                                        value={this.state.police_station_name}
                                        onChange={(e)=>{this.setState({police_station_name: e.currentTarget.value})}}
                                        type="text" className="form-control" id="police_station_name" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>City</label>
                                    <select
                                        value={this.state.police_station_address}
                                        onChange={(e)=>{this.setState({police_station_address: e.currentTarget.value})}}
                                        id="inputState" className="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label>PinCode</label>
                                    <input
                                        value={this.state.police_station_pin}
                                        onChange={(e)=>{this.setState({police_station_pin: e.currentTarget.value})}}
                                        type="text" className="form-control" id="police_station_pin" />
                                </div>
                            </div>

                            <label>
                                Phone No:<br/>
                            </label>

                            <input value={this.state.mobile} onChange={(e) => {this.setState( {mobile: e.currentTarget.value})}} type="text" name="phone" className="form-control" placeholder="Applicant’s Phone No."/>
                            <br/>

                            <label>
                                Address:                            </label>
                            <br/>
                                <input value={this.state.address}
                                       onChange={(e) => {this.setState({address: e.currentTarget.value})}}
                                       type="text" name="address" className="form-control" placeholder="Applicant’s Contact Address"/>
                            <br/>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label >City</label>
                                    <input type="text" className="form-control" id="inputCity" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label >State</label>
                                    <select id="inputState" className="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label>Pin Code</label>
                                    <input type="text" className="form-control" id="inputZip" />
                                </div>
                            </div>

                            <label>
                                Email Address:                            </label>
                            <br/>
                                <input
                                    value={this.state.email}
                                    onChange={(e) => {this.setState({email: e.currentTarget.value})}}
                                    type="text" name="email" className="form-control" placeholder="Applicant’s Email Address(If Any)"/>
                            <br/>

                            {/*<label>*/}
                            {/*    Local Police station:<br/>*/}
                            {/*    <input type="text" name="local_police_station" className="form-control" placeholder="Name of Local Police station" size="80"/>*/}
                            {/*</label>*/}
                            {/*<br/>*/}

                            <div className="form-group">
                                <label>ID proof</label>
                                <input type="file" className="form-control-file" />
                            </div>

                        </div>

                    </form>
                    <div className="text-center mb-5">
                        <button onClick={this.openModal} type="submit" className="btn btn-primary" >Submit</button>
                    </div>
                </div>
                }
            </React.Fragment>
        );
    }
}

export default FirComponent;