import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [sharedToken, setSharedToken] = useState(null)

  return (
    <AuthContext.Provider value={{sharedToken, setSharedToken}}>
      {children}
    </AuthContext.Provider>
  )

}