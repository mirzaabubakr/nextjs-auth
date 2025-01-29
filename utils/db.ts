export const getUserFromDb = async (username: string, password: string) => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    const headers = response.headers;
    const cookies = headers.get("set-cookie");
    let accessToken = null;

    if (cookies) {
      const cookieArray = cookies.split(';');
      const authCookie = cookieArray.find(cookie => cookie.trim().startsWith('Authentication='));
      if (authCookie) {
        accessToken = authCookie.split('=')[1];
      }
    }
    return { ...data, accessToken };
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    throw error;
  }
};
