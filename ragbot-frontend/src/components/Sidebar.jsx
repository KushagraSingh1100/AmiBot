import { Plus } from "lucide-react";
import {
  useGetSessionsQuery,
  useSetActiveSessionMutation,
} from "../reducers/api/chatApiSlice";
import { setSessionId } from "../store/chatSlice";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Sidebar = ({ setOpenNewChatWindow }) => {
  const [setActiveSession] = useSetActiveSessionMutation();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logged out");
    window.location.reload();
  };

  const handleSessionChange = async (sessionId) => {
    try {
      setSessionId(sessionId);
      await setActiveSession(sessionId).unwrap();
      dispatch(setSessionId(sessionId));
    } catch (error) {
      console.error("Failed to set active session:", error);
    }
  };

  const { data, isLoading: isGettingSessions } = useGetSessionsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );
  const sessions = data;
  console.log(sessions);

  return (
    <div className="h-[calc(100vh-80px)] py-4 pb-2 px-2 flex flex-col gap-6 items-center w-75 bg-neutral-100">
      <button
        onClick={() => {
          setOpenNewChatWindow(true);
        }}
        className="w-full flex items-center justify-center gap-1 bg-white p-2 px-4 cursor-pointer hover:opacity-65 transition-all duration-100 rounded-2xl"
      >
        <Plus className="w-4" />
        New Chat
      </button>
      <div className="h-full w-full flex flex-col gap-2 scrollbar-hide overflow-y-scroll">
        {isGettingSessions ? (
          <></>
        ) : (
          <>
            {sessions &&
              sessions.map((session) => {
                return (
                  <div
                    key={session.session_id}
                    onClick={() => handleSessionChange(session.session_id)}
                    className={
                      session.is_active
                        ? "w-full min-h-12 bg-neutral-300 font-semibold rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-65 transition-all duration-200"
                        : "w-full min-h-12 bg-white border border-neutral-300 font-semibold rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-65 transition-all duration-200"
                    }
                  >
                    {session.title}
                  </div>
                );
              })}
          </>
        )}
      </div>
      <div className="w-full px-4 py-2">
        <button
          className="w-full p-4 bg-white rounded-xl shadow cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
