import Navbar from "./Navbar";
import "./HomePage.css";
import Bot from "/bot.png";
import User from "/user.png";
import { useState } from "react";

function HomePage() {
  const [convo, setConvo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const sendReq = async () => {
    try {
      const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (!response.ok) {
        loading(false);
        throw new Error(res?.detail || "Something went wrong");
      }
      setConvo((prevItems) => [...prevItems, query, res[0].answer]);
      setLoading(false);
      setQuery("");
    } catch (error) {
      console.error("❌ Fetch error:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-[calc(100vh-82px)] flex-col items-center justify-start p-14">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-semibold">Welcome to AmiBot</h1>
          <p>
            Ask me any question from your assignment and I'll answer them from
            the amity notes only!
          </p>
        </div>
        <div className="chat-area w-[75%] h-max flex flex-col justify-end">
          <div className="chats gap-4 flex flex-col w-full h-max py-10">
            <div className="flex flex-col">
              <p className="text-neutral-300 text-sm ml-14">AmiBot</p>
              <div className="flex flex-row items-end w-max h-max gap-1">
                <img className="rounded-full w-10" src={Bot} alt="Bot" />
                <div className="max-w-145 w-max h-max bg-neutral-100 p-4 py-3 rounded-lg flex items-center justify-start">
                  <p className="w-max font-normal text-gray-700">
                    Hello! I'm AmiBot, your assignment buddy from your own
                    university, Amity. How can I assist you?
                  </p>
                </div>
              </div>
            </div>
            {convo.map((msg, indx) =>
              indx % 2 === 0 ? (
                <div key={indx} className="flex flex-col items-end">
                  <p className="text-neutral-300 text-end text-sm mr-14">
                    User
                  </p>
                  <div className="flex flex-row-reverse items-end w-max h-max gap-1">
                    <img className="rounded-full w-10" src={User} alt="User" />
                    <div className="max-w-160 w-max h-max bg-neutral-100 p-4 py-3 rounded-lg flex items-center justify-start">
                      <p className="w-max font-normal text-gray-700">{msg}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={indx} className="flex flex-col">
                  <p className="text-neutral-300 text-sm ml-14">AmiBot</p>
                  <div className="flex flex-row items-end w-max h-max gap-1">
                    <img className="rounded-full w-10" src={Bot} alt="Bot" />
                    <div className="max-w-160 w-max h-max bg-neutral-100 p-4 py-3 rounded-lg flex items-center justify-start">
                      <p className="w-max font-normal text-gray-700">{msg}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="fixed bottom-6 w-[70%] h-max flex flex-row">
          <textarea
            className="relative scrollbar-hide bg-neutral-100 min-h-12 max-h-100 rounded-lg rounded-r-none w-full px-4 py-2 resize-none overflow-y-scroll border-none outline-none focus:ring-0"
            placeholder="Type your question here..."
            value={query}
            rows={1}
            disabled={loading}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <div className="rounded-lg rounded-l-none h-12 bg-neutral-100 flex justify-center items-center p-3">
            <button
              onClick={() => {
                sendReq();
                setLoading(true);
              }}
              disabled={loading}
              className="bg-blue-500 text-white rounded-xl px-5 h-8 cursor-pointer transition duration-200 ease-in-out hover:opacity-65"
            >
              {loading ? "Sending" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
