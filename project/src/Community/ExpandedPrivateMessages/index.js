import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpandedMessage from "./message";

function ExpandedPrivateMessages(props) {
  const expandedId = props.expandedId;
  const users = props.users;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [newInput, setNewInput] = useState("");

  const API_BASE = "http://localhost:4000/api";
  const PRIVATE_MESSAGE_URL = `${API_BASE}/messages/private`;

  const findMessages = async (sender, receiver) => {
    try {
      const response = await axios.get(`${PRIVATE_MESSAGE_URL}/${sender}/${receiver}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const addNewMessage = async (sender, receiver, text) => {
    try {
      const newMessage = {
        input: text,
        fromUid: sender,
        toUid: receiver,
        _id: new Date().getTime(),
      };

      await axios.post(`${PRIVATE_MESSAGE_URL}/${sender}/${receiver}`, newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewInput("");
    } catch (error) {
      console.error("Error adding new message:", error);
    }
  };

  useEffect(() => {
    findMessages(expandedId, 1);
  }, [expandedId]);

  return (
    <div>
      <div className="wd-community-expanded-private-messages">
        {messages.map((message) => (
          <ExpandedMessage key={message._id} message={message} users={users} />
        ))}
      </div>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addNewMessage(1, expandedId, newInput);
          }}
        >
          <input
            type="text"
            value={newInput}
            onChange={(event) => {
              setNewInput(event.target.value);
            }}
            className="wd-community-global-text-message-text-box"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ExpandedPrivateMessages;
