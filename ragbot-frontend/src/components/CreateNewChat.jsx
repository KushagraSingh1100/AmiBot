import { useState } from "react";
import { useCreateNewSessionMutation } from "../reducers/api/chatApiSlice";
import { X } from "lucide-react";

function CreateNewChat({ setOpenNewChatWindow }) {
  const [createNewSession] = useCreateNewSessionMutation();
  const [chatName, setChatName] = useState("");
  const createNewChat = async () => {
    try {
      const response = await createNewSession({
        session_name: chatName,
      }).unwrap();
      setOpenNewChatWindow(false);
      console.log("Session created:", response);
    } catch (error) {
      console.error("Failed to create session", error);
    }
  };
  return (
    <div className="flex flex-col items-start justify-center w-max h-max p-8 py-10 gap-7 bg-neutral-100">
      <div className="w-full flex flex-row justify-between items-start">
        <h1 className="text-2xl font-semibold">Create New Chat</h1>
        <div
          className="cursor-pointer hover:opacity-50"
          onClick={() => {
            setOpenNewChatWindow(false);
          }}
        >
          <X />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <h3 className="text-lg">Chat Name: </h3>
        <input
          onChange={(e) => {
            setChatName(e.target.value);
          }}
          className="bg-white p-4 py-3 rounded-lg text-lg"
          type="text"
          placeholder="Enter chat name"
        />
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={createNewChat}
          className="bg-blue-500 w-full text-white px-6 py-2 font-semibold rounded-lg transition-opacity duration-150 hover:opacity-65 cursor-pointer"
        >
          Create Chat
        </button>
      </div>
    </div>
  );
}

export default CreateNewChat;
