import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class IndividualPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
        };
    }
    

    render() {
        // console.log("render: email: ", this.props.userEmail);
        console.log(" ", this.props.match);
        const content = (this.props.userEmail === this.state.slug)? 
            <p>{`this is ${this.props.userEmail} person page`}</p> : null
        return (
        <>
           { content? content : <Redirect to="/error" />}
        </>);
    }
}

function mapStateToProps(state){
    // console.log("state", new Date().getMilliseconds, " ",state);
    return {
        userEmail: state.user.UserData ? state.user.UserData.email : null
    }
};

export default connect(mapStateToProps)(IndividualPage);
