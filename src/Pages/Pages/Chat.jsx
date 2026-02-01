import React, { useState } from 'react';

function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! What are we learning today?", isMe: false },
    { id: 2, text: "I'm looking into some UI Design tips!", isMe: true },
  ]);
  const [input, setInput] = useState("");

  const styles = {
    container: {
      padding: '20px',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Quicksand', sans-serif",
      backgroundColor: '#f8f9fa', // Light bg to make the glass card pop
    },
    chatCard: {
      flex: 1,
      background: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(12px)',
      borderRadius: '30px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      maxWidth: '600px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      width: '100%'
    },
    header: {
      padding: '20px',
      textAlign: 'center',
      borderBottom: '1px solid rgba(155, 89, 182, 0.2)',
      color: '#6d5c7e',
      fontWeight: '800'
    },
    messageArea: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    bubble: (isMe) => ({
      alignSelf: isMe ? 'flex-end' : 'flex-start',
      background: isMe ? '#9b59b6' : 'white',
      color: isMe ? 'white' : '#6d5c7e',
      padding: '12px 18px',
      borderRadius: isMe ? '20px 20px 0 20px' : '20px 20px 20px 0',
      maxWidth: '75%',
      fontSize: '15px',
      fontWeight: '500',
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
    }),
    inputContainer: {
      padding: '20px',
      display: 'flex',
      gap: '10px'
    },
    input: {
      flex: 1,
      padding: '12px 20px',
      borderRadius: '25px',
      border: '2px solid #9b59b6',
      outline: 'none',
      fontFamily: "'Quicksand', sans-serif",
    },
    sendBtn: {
      background: '#9b59b6',
      color: 'white',
      border: 'none',
      padding: '0 20px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '700'
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, isMe: true }]);
    setInput("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatCard}>
        <div style={styles.header}>Chat Support</div>
        
        <div style={styles.messageArea}>
          {messages.map((msg) => (
            <div key={msg.id} style={styles.bubble(msg.isMe)}>
              {msg.text}
            </div>
          ))}
        </div>

        <div style={styles.inputContainer}>
          <input 
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button style={styles.sendBtn} onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;