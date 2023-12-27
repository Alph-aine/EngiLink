import { useContext } from "react"
import { AuthContext } from "./AppContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {

  const { sharedToken } = useContext(AuthContext)

  const isAuthenticated = sharedToken ? true : false
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute