import { apiSlice } from "../../store/apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    askQuestion: builder.mutation({
      query: (body) => ({
        url: "/query",
        method: "POST",
        body,
      }),
    }),
    createNewSession: builder.mutation({
      query: (body) => ({
        url: "/chat/new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sessions"],
    }),
    getMessages: builder.query({
      query: (conversation_id) => `/chat/conversations/${conversation_id}`,
      providesTags: (_result, _error, sessionId) => [
        { type: "Messages", id: sessionId },
      ],
    }),
    getSessions: builder.query({
      query: () => ({
        url: "/chat/conversations",
        method: "GET",
      }),
      providesTags: ["Sessions"],
    }),
    getActiveSession: builder.query({
      query: () => ({
        url: "/chat/conversations/active-session",
        method: "GET",
      }),
    }),
    setActiveSession: builder.mutation({
      query: (conversation_id) => ({
        url: `/chat/activate/session/${conversation_id}`,
        method: "POST",
      }),
      invalidatesTags: ["Sessions", "ActiveSession"],
    }),
  }),
});

export const {
  useAskQuestionMutation,
  useCreateNewSessionMutation,
  useGetMessagesQuery,
  useGetSessionsQuery,
  useGetActiveSessionQuery,
  useSetActiveSessionMutation,
} = chatApi;
