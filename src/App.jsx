import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();
  const chatLogRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    chatLogRef.current.scrollTo(0, chatLogRef.current.scrollHeight);
  }, [chatLog]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    let tempChatLog = [...chatLog]; // create a copy of chatLog

    const newMessage = { role: "user", content: message.trim() };
    tempChatLog.push(newMessage); // update the copy
    setChatLog(tempChatLog); // update the state
    setMessage("");

    setIsLoading(true);

    try {
      const response = await fetch("https://chatgpt53.p.rapidapi.com/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "858fac585cmsha3a40ff014488bdp13e05bjsnc2703e8dd22f",
          "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
        },
        body: JSON.stringify({ messages: [newMessage] }),
      });

      const data = await response.json();
      const botMessage = {
        role: "bot",
        content: data.choices[0].message.content,
      };
      tempChatLog.push(botMessage); // update the copy
      setChatLog(tempChatLog); // update the state
    } catch (error) {
      tempChatLog.push({ role: "bot", content: "Error : Check Your Api Key!" }); // update the copy
      setChatLog(tempChatLog); // update the state
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between mx-auto h-screen max-w-custom">
        <div className="header flex items-center justify-center text-gray-500 border-b border-gray-600 h-11">
          <h3 className="text-xl font-medium">ChatGPT Bot</h3>
        </div>

        <div ref={chatLogRef} className="flex-1 overflow-y-auto p-4">
          {chatLog.map((chat, index) => (
            <div key={index}>
              <div
                className={`flex items-center ${
                  chat.role === "user" ? "text-white" : "text-white"
                }`}
              >
                {chat.role === "user" ? (
                  <>
                    <div className="mr-2">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="bg-[#19c37d] ml-1 px-[12px] py-[11px] rounded-md"
                      />
                    </div>
                    <p className="text-white rounded-md p-3"> {chat.content}</p>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row items-start">
                      <div className="mr-2">
                        <FontAwesomeIcon
                          icon={faRobot}
                          className="bg-[#9859b7] ml-1 px-[10px] py-[11px] rounded-md"
                        />
                      </div>
                      <p className="text-white bg-[#444654] rounded-md p-3">
                        {" "}
                        {chat.content}
                      </p>
                    </div>
                  </>
                )}
              </div>
              {index !== chatLog.length - 1 && (
                <hr className="my-4 border-t border-gray-300 w-full" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#343541] p-2.5 flex justify-between border-t border-gray-700 sticky bottom-0">
          <input
            type="text"
            className="w-full bg-[#40414f] text-white border-none outline-none p-2 flex-9 text-base font-normal rounded-md"
            placeholder="Send a message."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />

          <button
            onClick={sendMessage}
            className="flex items-center justify-center py-2 px-5 border-none rounded-md bg-[#4caf50] text-white cursor-pointer ml-3 transition-all duration-300 ease-in-out hover:bg-green-700"
          >
            <FontAwesomeIcon
              icon={isLoading ? faSpinner : faPaperPlane}
              spin={isLoading}
              className="bg-transparent"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
