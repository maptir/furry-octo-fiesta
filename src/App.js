import React, { Component } from 'react';
import { reverse, sortBy, prop } from 'ramda'
import messages from './data/messages'
import profile from './data/profile'
import './App.css';

class App extends Component {
  state = {
    sortByLongestConversation: sortBy(prop('conversation')),
    message: messages[0]
  }

  heartCount = () => {
    return this.state.message.conversation.reduce((accum, current) => 
      current.heart ? accum + 1 : accum, 0)
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message.participants[1] === profile.username ? 
          this.state.message.participants[0] : this.state.message.participants[1]}
          : {this.state.message.conversation.length} Chats</h1>
        <div className="row">
          <div className="chat">
            <div>Heart Count: {this.heartCount()}</div>
          </div>
          <div className="chat">
            {
              reverse(this.state.message.conversation).map(chat => {
                const date = new Date(chat.created_at)
                return (
                <div 
                  style={{ 
                    textAlign: chat.sender === profile.username ? 'right' : 'left', 
                    margin: '0.5em',
                    borderRadius: '24px',
                  }}
                  onClick={() => {console.log(chat)}}
                >
                  <div style={{fontSize: '10px'}}>{chat.story_share}</div>
                  {chat.text}
                  {chat.heart}
                  <div className="date">{`${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</div>
                </div>
              )})
            }
          </div>
          <div className="chat">
            {
              reverse(this.state.sortByLongestConversation(messages)).map(message => (
                <div style={{ cursor: 'pointer' }} onClick={() => this.setState({message})}>
                  {message.participants[1] === profile.username ? message.participants[0] : message.participants[1]}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
