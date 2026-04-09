import axios from "axios";

// Use a standalone instance so the global auth interceptor does not attach
// an Authorization header to this public endpoint.

const publicClient = axios.create();

export const getPosts = () =>
  publicClient.get("https://events.kli.one/api/posts").then((res) => res.data);
