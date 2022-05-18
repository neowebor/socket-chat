import React, { useEffect, useState } from "react";
import socket from "./Services/socket-lib/socket";
import styled from "styled-components";
import Axios from "./Services/axios/Axios";

const App = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesFromDatabase, createMessage] = useState([]);
  useEffect(() => {
    getMessage();
    socket.on("chat message", (message) => {
      setMessages([message, ...messages]);
    });
  }, [messages]);

  const getMessage = async () => {
    await Axios.get("/").then((resp) => {
      const messages = resp.data;
      createMessage([...messages]);
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const sendMessage = async (e) => {
    if (value === "") return;

    if (e.charCode === 13 || e.type === "click") {
      const message = {
        message: value,
        user_id: socket.id,
      };
      socket.emit("chat message", message);
      await Axios.post("/send_message", message);
      setValue("");
    }
  };

  return (
    <Wrapper>
      <Form>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyPress={sendMessage}
        />
        <Button onClick={sendMessage}>Отправить</Button>
      </Form>
      <Messages>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              socket.id === msg.user_id ? "my_message" : "friend_message"
            }
          >
            {msg.message}
          </div>
        ))}
      </Messages>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Messages = styled.div`
  flex: 1 0 auto;
  background-color: #eee;
`;

const Form = styled.div`
  background-color: #eee;
  display: flex;
  flex: 0 0 auto;
  gap: 20px;
  padding-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #000;
  outline: none;
  font-size: 20px;
  resize: none;
  padding: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid #000;
  background-color: #fff;
  font-size: 20px;
  justify-content: flex-end;
`;

export default App;
