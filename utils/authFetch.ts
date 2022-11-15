import { isAuthenticated } from "./isAuthenticated";

export const authFetch = async (url: string, session: any) => {
  if (!isAuthenticated(session)) {
    throw new Error("Not authenticated.");
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("ERROR: ", error));

  return res;
};
