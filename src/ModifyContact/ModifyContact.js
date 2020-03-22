import React, { Component } from 'react';
import * as Constants from '../Constants';
import Axios from 'axios';
import './ModifyContact.scss';

class ModifyContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [{ addressType: "Home" }],
            phones: [{ phoneType: "Home" }],
            dates: [{ dateType: "Birthday" }],
            isSubmit: false,
            successValue:0,
            contact:this.props.location.contactDetails
        }
        this.initialData = {};
        this.updatedData = {};
        
    }

    componentDidMount(){
        let {contact} = this.state;
        Axios.get(Constants.baseURL+Constants.FULL_DETAILS+contact.contactId)
        .then((res)=>{
            this.initialData = JSON.parse(JSON.stringify(res.data));
            this.setState({
                addresses:res.data.addresses,
                phones:res.data.phones,
                dates:res.data.dates,
                fname:res.data.fname,
                mname:res.data.mname,
                lname:res.data.lname,
            })
        })
    }

    handleAddress(event, index) {
        let { addresses } = this.state;
        addresses[index][event.target.id] = event.target.value;
        this.setState({
            addresses
        })
    }

    handlePhone(event, index) {
        let { phones } = this.state;
        phones[index][event.target.id] = event.target.value;
        this.setState({
            phones
        })
    }

    handleDate(event, index) {
        let { dates } = this.state;
        dates[index][event.target.id] = event.target.value;
        this.setState({
            dates
        })
    }

    handleNames(event) {
        let name = this.state[event.target.id];
        name = event.target.value;
        this.setState({
            [event.target.id]: name
        })
    }

    displayAddress(index) {
        let { addresses, isSubmit } = this.state;
        return (
            <div className="address-outline" key={index}>
                <div className="address-group">
                    <div className="form-group address">
                        <label className="col-form-label">Address</label>
                        <input type="text" className={isSubmit && !addresses[index].address ? `form-control is-invalid` : `form-control`}
                            placeholder="Enter the address" id="address" value={addresses[index].address}
                            onChange={(e) => this.handleAddress(e, index)} />
                    </div>
                    <div className="form-group address-type">
                        <label className="col-form-label">Address Type</label>
                        <select className="form-control" id="addressType" value={addresses[index].addressType}
                            onChange={(e) => this.handleAddress(e, index)}>
                            <option>Home</option>
                            <option>Work</option>
                        </select>
                    </div>
                </div>
                <div className="contact">
                    <div className="form-group city-state">
                        <label className="col-form-label">City</label>
                        <input type="text" className={isSubmit && !addresses[index].city ? `form-control is-invalid` : `form-control`}
                            placeholder="City" id="city" value={addresses[index].city}
                            onChange={(e) => this.handleAddress(e, index)} />
                    </div>
                    <div className="form-group city-state">
                        <label className="col-form-label">State</label>
                        <input type="text" className={isSubmit && !addresses[index].state ? `form-control is-invalid` : `form-control`}
                            placeholder="State" id="state" value={addresses[index].state}
                            onChange={(e) => this.handleAddress(e, index)} />
                    </div>
                    <div className="form-group zip">
                        <label className="col-form-label">Zip</label>
                        <input type="text" className={isSubmit && !addresses[index].zip ? `form-control is-invalid` : `form-control`}
                            placeholder="Zip" id="zip" value={addresses[index].zip}
                            onChange={(e) => this.handleAddress(e, index)} />
                    </div>
                </div>
            </div>
        )
    }

    allAddresses() {
        let { addresses } = this.state;
        return addresses.map((obj, index) => {
            return this.displayAddress(index)
        })
    }

    addNewAddress() {
        let { addresses,contact } = this.state;
        addresses.push({ addressType: "Home", contact: contact });
        this.setState({
            addresses
        })
    }

    displayPhones(index) {
        let { isSubmit, phones } = this.state;
        return (
            <div className="phone-outline" key={index}>
                <div className="form-group number">
                    <label className="col-form-label">Phone Number</label>
                    <input type="text" className={isSubmit && !phones[index].number ? `form-control is-invalid` : `form-control`}
                        value={phones[index].number}
                        placeholder="Phone Number" id="number"
                        onChange={(e) => this.handlePhone(e, index)} />
                </div>
                <div className="form-group number">
                    <label className="col-form-label">Phone Type</label>
                    <select className="form-control" id="phoneType"
                        value={phones[index].phoneType}
                        onChange={(e) => this.handlePhone(e, index)}>
                        <option>Home</option>
                        <option>Work</option>
                    </select>
                </div>
                <div className="form-group number">
                    <label className="col-form-label">Area Code</label>
                    <input type="text" className={isSubmit && !phones[index].areaCode ? `form-control is-invalid` : `form-control`}
                        placeholder="Area Code" id="areaCode"
                        value={phones[index].areaCode}
                        onChange={(e) => this.handlePhone(e, index)} />
                </div>
            </div>
        )
    }

    allPhones() {
        let { phones } = this.state;
        return phones.map((obj, index) => {
            return this.displayPhones(index)
        })
    }

    addNewPhone() {
        let { phones,contact } = this.state;
        phones.push({phoneType:"Home", contact: contact});
        this.setState({
            phones
        })
    }

    displayDates(index) {
        const { dates, isSubmit } = this.state;
        return (
            <div className="date-outline" key={index}>
                <div className="form-group date">
                    <label className="col-form-label">Date</label>
                    <input type="text" className={(isSubmit && !this.isValidDate(dates[index].date)) ? `form-control is-invalid` : `form-control`}
                        placeholder="yyyy-mm-dd" id="date"
                        value={dates[index].date}
                        onChange={(e) => this.handleDate(e, index)} />
                </div>
                <div className="form-group date">
                    <label className="col-form-label">Date Type</label>
                    <select className="form-control" id="dateType"
                        onChange={(e) => this.handleDate(e, index)}
                        value={dates[index].dateType}>
                        <option>Birthday</option>
                        <option>Anniversary</option>
                    </select>
                </div>
            </div>
        )
    }

    allDates() {
        let { dates } = this.state;
        return dates.map((obj, index) => {
            return this.displayDates(index)
        })
    }


    addNewDate() {
        let { dates,contact } = this.state;
        dates.push({dateType:"Birthday", contact: contact});
        this.setState({
            dates
        })
    }

    isValidDate(dateString) {
        if (!dateString) {
            return false;
        }
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        let d = new Date(dateString);
        let dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    handleSubmit() {
        this.setState({
            isSubmit: true
        })
        if (this.validForm()) {
            this.getUpdatedData();
            console.log(this.updatedData,"updated")
            Axios.post(Constants.baseURL + Constants.UPDATE_CONTACT,this.updatedData)
                .then((response) => {
                    this.setState({
                        successValue:1
                    })
                })
                .catch((error) => {
                    this.setState({
                        successValue:2
                    })
                });
        }
    }

    getUpdatedData(){
        const {state, initialData,updatedData} = this;
        console.log(initialData,"init")
        if(state.fname!==initialData.fname || state.mname!==initialData.mname || state.lname!==initialData.lname){
            updatedData.fname = state.fname;
            updatedData.mname = state.mname;
            updatedData.lname = state.lname;
        }
        updatedData.addresses =  [];
        updatedData.phones =  [];
        updatedData.dates =  [];
        state.addresses.map((address,index)=>{
            if(address.addressId){
                if(JSON.stringify(initialData.addresses[index])!==JSON.stringify(address)){
                    updatedData.addresses.push(address);
                }
            }
            else{
                updatedData.addresses.push(address);
            }
        })
        state.phones.map((phone,index)=>{
            if(phone.phoneId){
                if(JSON.stringify(initialData.phones[index])!==JSON.stringify(phone)){
                    updatedData.phones.push(phone);
                }
            }
            else{
                updatedData.phones.push(phone);
            }
        })
        state.dates.map((date,index)=>{
            if(date.dateId){
                if(JSON.stringify(initialData.dates[index])!==JSON.stringify(date)){
                    updatedData.dates.push(date);
                }
            }
            else{
                updatedData.dates.push(date);
            }
        })
        this.updatedData = updatedData;
    }

    validForm() {
        let { state } = this;
        let result = true;
        if (!state.fname || !state.lname) {
            result = false;
        }
        state.addresses.map((obj) => {
            if (!obj.address || !obj.state || !obj.zip) {
                result = result && false;
            }
        })
        state.phones.map((obj) => {
            if (!obj.number || !obj.areaCode) {
                result = result && false;
            }
        })
        state.dates.map((obj) => {
            if (!this.isValidDate(obj.date)) {
                result = result && false;
            }
        })
        return result;
    }

    successMessage(){
        this.setState({
            isSubmit:false,
            successValue:0
        })
    }

    render() {
        const { fname, mname, lname, isSubmit, successValue } = this.state;
        return (
            <React.Fragment>
                <div className="add-contact-form">
                    <legend>Modify Contact</legend>
                    <div className="contact">
                        <div className="form-group name">
                            <label className="col-form-label">First Name</label>
                            <input type="text"
                                value={fname}
                                className={isSubmit && !fname ? `form-control is-invalid` : `form-control`}
                                placeholder="First Name" id="fname"
                                onChange={(e) => this.handleNames(e)} />
                        </div>
                        <div className="form-group name">
                            <label className="col-form-label">Middle Name</label>
                            <input type="text" 
                                value={mname}
                                className="form-control"
                                placeholder="Middle Name" id="mname"
                                onChange={(e) => this.handleNames(e)} />
                        </div>
                        <div className="form-group name">
                            <label className="col-form-label">Last Name</label>
                            <input type="text" 
                                value={lname}
                                className={isSubmit && !lname ? `form-control is-invalid` : `form-control`}
                                placeholder="Last Name" id="lname"
                                onChange={(e) => this.handleNames(e)} />
                        </div>
                    </div>
                    {this.allAddresses()}
                    <button type="button" className="btn btn-primary add-address" onClick={this.addNewAddress.bind(this)}>Add New Address</button>
                    {this.allPhones()}
                    <button type="button" className="btn btn-primary add-address" onClick={this.addNewPhone.bind(this)}>Add New Phone</button>
                    {this.allDates()}
                    <button type="button" className="btn btn-primary add-address" onClick={this.addNewDate.bind(this)}>Add New Date</button>
                    <div className="submit-wrapper">
                        <button type="button" className="btn btn-success btn-lg  btn-block submit" onClick={this.handleSubmit.bind(this)}>Update</button>
                    </div>
                    {   
                        successValue>0 ? 
                        <div id="overlay" className={isSubmit ? null : `not-display`} onClick={this.successMessage.bind(this)}>
                            {
                                successValue===1 ?
                                <div id="text" className="display btn btn-success btn-lg  btn-block submit">Successfully Updated!</div>
                                :
                                <div id="text" className="btn btn-danger btn-lg  btn-block submit">Updation failed!</div>
                            }
                        </div>
                        :
                        null
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default ModifyContact;