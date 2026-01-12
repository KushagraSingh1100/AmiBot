import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";


const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState()).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQuery = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
        api.dispatch(logout());
        window.location.href = "/login";
  }

  return result;
};

export { baseQuery };

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Messages", "Sessions", "ActiveSession"],
  endpoints: () => ({}),
});
