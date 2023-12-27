import { useContext } from "react"
import { AuthContext } from "./AppContext"
import { Navigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {

  const { sharedToken } = useContext(AuthContext)

const isAuthenticated = sharedToken ? true : false
  if (!isAuthenticated) {
    toast.info('Redirecting to login page...')
    return <Navigate to='/login' />
  }

  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}

export default ProtectedRoute