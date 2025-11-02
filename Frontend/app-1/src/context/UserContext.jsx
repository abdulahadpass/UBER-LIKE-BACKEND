import { useState } from "react";
import { UserContextData } from "./createUserContext";

// Create a provider component
export function UserProvider({ children }) {
    const [user, setUser] = useState({
        email: "",
        fullName: {
            firstName: "",
            lastName: ""
        }
    });
    const name = 'ahad'
    return (
        <UserContextData.Provider value={{ user, name, setUser }}>
            {children}
        </UserContextData.Provider>
    );
}
