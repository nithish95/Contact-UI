import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './Card.scss';

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDelete :false,
        }
    }
    handleDelete(){
        const {isDelete} = this.state;
        this.setState({
            isDelete:!isDelete
        })
    }
    render(){
    const {isDelete} = this.state;
    return (
        <React.Fragment>
        <div className="card border-primary mb-3">
            <div className="card-header">Contact Details</div>
            <div className="card-body">
                <h4 className="card-title">{`${this.props.contact.fName} ${this.props.contact.lName}`}</h4>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-danger btn-sm" onClick={this.handleDelete.bind(this)}>Delete</button>
                <Link 
                to = {{
                    pathname:"/modify", 
                    contactDetails:this.props.contact
                }}
                ><button type="button" className="btn btn-primary btn-sm">Modify</button></Link>
            </div>
        </div>
           {
            isDelete ?
            <div id="delete-overlay" onClick={this.handleDelete.bind(this)}>
            <div id="delete-text" className="card border-primary mb-3">
            <div className="card-body">
                <h4 className="card-title">Do you want to delete this Contact?</h4>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-danger btn-md" onClick={()=>this.props.onDelete(this.props.contact.contactId)}>Yes</button>
                <button type="button" className="btn btn-primary btn-md">No</button>
            </div>
        </div>
        </div>
        :
        null
        }
        </React.Fragment>
    );
    }
}

export default Card;

