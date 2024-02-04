import { User } from "@/data/authTypes";

export const postData = async (link: string, postDetails: any, user: User) => {
  const response = await fetch(link, {
    method: "POST",
    body: JSON.stringify(postDetails),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    if (data.error.includes("getaddrinfo ENOTFOUND")) {
      return { error: "Please check your connection" };
      // throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return { error: data.error };
    // throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return data;
};
