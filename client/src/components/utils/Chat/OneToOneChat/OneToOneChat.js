import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Form, Input, Icon, Button, Row, Col }from 'antd';
import moment from 'moment';

OneToOneChat.propTypes = {
    counterpartId: PropTypes.array,
}

class OneToOneChat extends Component {
    constructor(props){
        super(props);
        this.state = {
            ChatMessage: "",
            userId: this.props.UserData._id,
            chatRoomId: "",
            counterpartId: this.props.counterpartId && this.props.counterpartId.length > 0 ? 
                this.props.counterpartId
                : [], 
        }
    }    

    componentDidMount(){
        let server = "http://localhost:5000";
        this.socket = io(server);
        this.socket.on("Output Chat Message", messageFromBackend => {
            console.log(messageFromBackend);
        })
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
        let counterpartId = this.state.counterpartId
        let chatRoomId = this.state.chatRoomId;
        

        if(!chatRoomId){
            this.socket.emit("Start A Chat Room",{
                userId: userId,
                counterpartId: counterpartId,
                chatMessage: this.state.ChatMessage,
                submitTime: submitTime,
                chatRoomType: "1:1",
            })
        }else{
            this.socket.emit("Input Chat Message",{
                userId: userId,
                chatRoomId: chatRoomId,
                chatMessage: this.state.ChatMessage,
                submitTime: submitTime,              
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="infinite-container">
                    {/* {TODO} */}
                    <div ref={el => {
                        this.messageEnd = el;
                    }}></div>
                </div>
                <Row>
                    <Form layout="inline">
                        <Col span={18}>
                            <Input 
                                id="message"
                                prefix={<Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />}
                                placeholder="enter a message"
                                type="text"
                                onChange={this.handleInputChange}
                            />
                        </Col>
                        <Col span={2}>

                        </Col>
                        <Col span={4}>
                            <Button type="primary" style={{width:"100%"}} onClick={this.submitMessage}>
                                <Icon type="enter"/>
                            </Button>
                        </Col>
                    </Form>                    
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        UserData: state.user.UserData._id,
    }
}

export default connect(mapStateToProps)(OneToOneChat)