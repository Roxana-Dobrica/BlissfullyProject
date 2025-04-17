import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [userInputChatBot, setUserInputChatBot] = useState({
    aiRequest: "",
  });
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToLastMessage = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [messages]);

  const sendMessageToChatBot = async () => {
    if (!userInputChatBot.aiRequest) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", message: userInputChatBot.aiRequest },
    ]);

    setUserInputChatBot({ aiRequest: "" });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/OpenAI/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ aiRequest: userInputChatBot.aiRequest }),
        }
      );
      if (response.ok) {
        const responseChatBot = await response.json();

        const chatBotResponse = responseChatBot.choices[0]?.message?.content;
        if (chatBotResponse) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", message: chatBotResponse },
          ]);
        }
      } else {
        console.error("Failed to send message to ChatBot");
      }
    } catch (error) {
      console.error("Error sending message to ChatBot:", error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <img
          src="./images/PatientDashboard/chatbot-image.jpg"
          alt="chatbot"
          className="chatbot-image-chat"
        />
        <div className="chatbot-header-text">
          <h1>Chat with BuddyBot</h1>
          <p>
            Hi! Whether you need inspiration for activities, practical tips for
            daily tasks, or simply a friendly ear to listen, I'm here for you!
          </p>
        </div>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {message.message.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-user-input">
        <input
          type="text"
          value={userInputChatBot.aiRequest}
          placeholder="Write here..."
          onChange={(e) => setUserInputChatBot({ aiRequest: e.target.value })}
        />
        <button onClick={sendMessageToChatBot}>
          <img
            src="./images/Patient/send-message.png"
            alt="send-message-icon"
            className="send-message-icon"
          />
        </button>
      </div>
    </div>
  );
}

export default ChatBot;