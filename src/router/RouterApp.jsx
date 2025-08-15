
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("auth:user")) || null; }
    catch { return null; }
  });

  
  useEffect(() => {
    if (user) localStorage.setItem("auth:user", JSON.stringify(user));
    else localStorage.removeItem("auth:user");
  }, [user]);

  
  const login = async (username, password) => {
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) return false;

      const { token } = await res.json();
      setUser({ username, token }); 
      return true;                  
    } catch {
      return false;
    }
  };

 
  const register = async ({ firstname, lastname, username, email, password, phone }) => {
    const body = {
      email,
      username,
      password,
      name: { firstname: firstname || "Demo", lastname: lastname || "User" },
      address: {
        city: "Buenos Aires",
        street: "Demo",
        number: 1,
        zipcode: "1000",
        geolocation: { lat: "-34.6", long: "-58.4" }
      },
      phone: phone || "0000000000"
    };

    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) return false;

      const data = await res.json();
      
      setUser({ id: data.id, username: body.username, email: body.email, token: null });
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
