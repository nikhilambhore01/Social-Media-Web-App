/** @format */

import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // {content: 'some message', self: true}
      typedMessage: '',
      collapsed: false,
    };
    this.socket = io.connect('http://codeial.codingninjas.com:5000');
    // this.socket = io.connect('http://54.237.158.65:5000');
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;

    this.socket.on('connect', function () {
      console.log('CONNECTION ESTABLISHED');

      socketConnection.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'codeial',
      });

      socketConnection.on('user_joined', function (data) {
        console.log('NE USER JOINED', data);
      });
    });

    this.socket.on('receive_message', function (data) {
      // add message to state
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;

    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
  };

  collapseChat = () => {
    const { collapsed } = this.state;

    // console.log("Collapsed : ", collapsed);

    if (collapsed == true) {
      this.setState({
        collapsed: false,
      });
    } else {
      this.setState({
        collapsed: true,
      });
    }
  };
  render() {
    const { typedMessage, messages, collapsed } = this.state;

    return (
      <div className={collapsed ? 'chat-container' : 'no-chat-box'}>
        <div className="chat-header">
          Chat
          <button className="no-btn-box" onClick={this.collapseChat}>
            <img
              src="https://icons-for-free.com/iconfiles/png/512/minus+icon-1320185727443878037.png"
              alt="close-chat"
              height={17}
            />
          </button>
          {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Flat_minus_icon.svg/768px-Flat_minus_icon.svg.png"
              alt="close-chat"
              height={16}
            /> */}
          {/* <img
            src="https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
            alt=""
            height={17}
          /> */}
        </div>
        <div className={collapsed ? 'chat-messages' : 'no-chat'}>
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }>
              {message.content}
            </div>
          ))}
        </div>
        <div className={collapsed ? 'chat-footer' : 'no-chat'}>
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chat);
