import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../Constants';
import Card from '../Card/Card';
import {Link} from 'react-router-dom';
import './Contacts.scss';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactDetails: [],
            searchValue:""
        }
    }

    callSearch(){
        const {searchValue} = this.state;
        console.log(searchValue)
        if (searchValue.length > 2) {
            axios.get(Constants.baseURL + Constants.search + searchValue)
                .then(res => {
                    console.log(res.data)
                    this.setState({ contactDetails: res.data });
                })
        }
        else {
            this.setState({ contactDetails: [] });
        }
    }

    search(event) {
        this.setState({
            searchValue : event.target.value
        },()=>{
            this.callSearch();
        })
    }

    onDelete(id){
        let {contactDetails} = this.state;
        axios.delete(Constants.baseURL+Constants.DELETE_CONTACT+id)
        .then(res => {
            contactDetails = contactDetails.filter(function( obj ) {
                return obj.contactId !== id;
            });
        })
        .then(()=>{
            this.setState({
                contactDetails
            })
        })
    }

    displayResults() {
        const { contactDetails } = this.state;
        return contactDetails.map((contact,index) => {
            return (
            <div key={index}>
            <Card contact={contact} key={index} onDelete={this.onDelete.bind(this)}/>
            </div>
            )
        })
    }

    render() {
        const { contactDetails } = this.state;
        return (
            <div>
                <div className="add-new-contact">
                <Link to="/add"><button type="button" className="btn add-new-btn btn-primary btn-lg">Add New Contact</button></Link>
                </div>
                <div className="form-group search-wrapper">
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        id="searchBox"
                        aria-describedby="searchHelp"
                        placeholder="Search for Contacts"
                        onChange={this.search.bind(this)}
                    />
                </div>
                <div className="card-wrapper">
                    {
                        contactDetails.length > 0
                            ?
                            this.displayResults()
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default Contacts;