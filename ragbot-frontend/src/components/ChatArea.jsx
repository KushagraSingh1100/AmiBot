import Bot from "/bot.png";
import User from "/user.png";
import { useEffect, useState } from "react";
import {
  useGetMessagesQuery,
  useAskQuestionMutation,
} from "../reducers/api/chatApiSlice";
import { useSelector } from "react-redux";
import { selectActiveSessionId } from "../store/chatSlice";

const WELCOME_MESSAGE = {
  role: "ASSISTANT",
  content:
    "Hello! I'm AmiBot, your assignment buddy from your own university, Amity. How can I assist you?",
};

const ChatArea = () => {
  const [convo, setConvo] = useState([WELCOME_MESSAGE]);
  const [query, setQuery] = useState("");
  const conversationId = useSelector(selectActiveSessionId);

  const { data, isLoading: messagesLoading } = useGetMessagesQuery(
    conversationId,
    { skip: !conversationId }
  );

  useEffect(() => {
    if (data?.messages) {
      setConvo([WELCOME_MESSAGE, ...data.messages]);
    }
  }, [data]);

  const [askQuestion, { isLoading: asking }] = useAskQuestionMutation();

  const sendReq = async () => {
    if (!query.trim() || !conversationId) return;

    setConvo((prev) => [...prev, { role: "USER", content: query }]);
    setQuery("");

    try {
      const res = await askQuestion({
        conversation_id: conversationId,
        query,
      }).unwrap();

      setConvo((prev) => [
        ...prev,
        { role: "ASSISTANT", content: res.answer },
      ]);
    } catch (err) {
      console.error("❌ Ask failed", err);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [convo]);

  return (
    <div className="flex overflow-y-hidden min-h-[calc(100vh-82px)] w-full flex-col items-center p-14">
      {convo.length <= 1 && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-semibold">Welcome to AmiBot</h1>
          <p>
            Ask me any question from your assignment and I'll answer them from
            the amity notes only!
          </p>
        </div>
      )}

      <div className="chat-area w-[75%] flex flex-col">
        <div className="chats flex flex-col gap-4 py-10">
          {messagesLoading && <p>Loading messages...</p>}

          {convo.map((msg, indx) =>
            msg.role === "USER" ? (
              <div key={indx} className="flex flex-col items-end">
                <p className="text-neutral-300 text-sm mr-16">User</p>
                <div className="flex flex-row-reverse gap-1">
                  <img src={User} className="w-14 rounded-full" />
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    {msg.content}
                  </div>
                </div>
              </div>
            ) : (
              <div key={indx} className="flex flex-col">
                <p className="text-neutral-300 text-sm ml-14">AmiBot</p>
                <div className="flex flex-row gap-1">
                  <img src={Bot} className="w-12 rounded-full" />
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    {msg.content}
                  </div>
                </div>
              </div>
            )
          )}

          {asking && (
            <div className="flex flex-col">
              <p className="text-neutral-300 text-sm ml-14">AmiBot</p>
              <div className="flex gap-1">
                <img src={Bot} className="w-10 rounded-full" />
                <div className="bg-neutral-100 p-4 rounded-lg">
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-6 w-[70%] flex flex-row">
        <textarea
          className="relative scrollbar-hide bg-neutral-100 min-h-12 max-h-100 rounded-lg rounded-r-none w-full px-4 py-4 resize-none overflow-y-scroll border-none outline-none focus:ring-0"
          placeholder="Type your question here..."
          value={query}
          rows={1}
          disabled={asking}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="rounded-lg rounded-l-none h-12 bg-neutral-100 flex justify-center items-center p-4 py-7">
          <button
            onClick={sendReq}
            disabled={asking}
            className="bg-blue-600 text-white rounded-xl px-5 h-8 cursor-pointer transition duration-200 ease-in-out hover:opacity-65"
          >
            {asking ? "Sending" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
