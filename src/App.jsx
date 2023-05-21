import "./App.css";

import { IoIosSend } from "react-icons/io";

function App() {
  return (
    <>
      <div className="flex flex-col justify-between mx-auto h-screen max-w-custom">
        <div className="header flex items-center justify-center text-gray-500 border-b border-gray-600 h-11">
          <h3 className="text-xl font-medium">ChatGPT Bot</h3>
        </div>

        <div class="chat-container">
          <div id="chat-log"></div>
        </div>

        <div class="input-container">
          <input type="text" id="user-input" placeholder="Send a message." />
          <button id="send-button">
            <IoIosSend />
            <i class="fa-solid fa-paper-plane" id="button-icon"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
