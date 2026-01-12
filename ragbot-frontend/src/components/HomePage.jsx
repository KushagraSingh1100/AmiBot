import Navbar from "./Navbar";
import "./HomePage.css";
import ChatArea from "./ChatArea";
import Sidebar from "./Sidebar";
import { useState } from "react";
import CreateNewChat from "./CreateNewChat";

function HomePage() {
  const [openNewChatWindow, setOpenNewChatWindow] = useState(false);
  return (
    <div>
      <Navbar />
      {openNewChatWindow ? (
        <div className="relative">
          <div className="opacity-30 flex flex-row justify-start">
            <Sidebar setOpenNewChatWindow={setOpenNewChatWindow} />
            <ChatArea />
          </div>
          <div className="absolute top-1/6 right-[34%]">
            <CreateNewChat setOpenNewChatWindow={setOpenNewChatWindow}/>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-start">
          <Sidebar setOpenNewChatWindow={setOpenNewChatWindow} />
          <ChatArea />
        </div>
      )}
    </div>
  );
}

export default HomePage;
