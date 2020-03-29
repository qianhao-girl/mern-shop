import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Form, Input, Icon, Button, Row, Col }from 'antd';
import moment from 'moment';


class OneToOneChat extends Component {
    constructor(props){
        super(props);
        this.state = {
            ChatMessage: "",
            userId: this.props.UserData._id,
            chatRoomId: "",
        }
    }    

    componentDidMount(){
        let server = "http://localhost:5000";
        this.socket = io(server);
    }

    handleInputChange = (event) => {
        this.setState(prevState => {
            return { ...prevState , ChatMessage: event.target.value}
        });
    }

    submitMessage = (e) => {
        e.preventDefault();

        if(!this.state.ChatMessage){
            return;
        };
        
        let submitTime = moment();
        let userId = this.props.UserData._id;
        let chatRoomId = this.state.chatRoomId;
        

        if(!chatRoomId){
            this.socket.emit("create one-to-one chat room",{
                userId: userId,
                chatMessage: this.state.ChatMessage,
                submitTime: submitTime,
            })
        }else{
            this.socket.emit("chat message",{
                userId: userId,
                chatRoomId: chatRoomId,
                chatMessage: this.state.ChatMessage,
                submitTime: submitTime,
            })
        }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        UserData: state.user.UserData
    }
}

export default connect(mapStateToProps)(OneToOneChat)