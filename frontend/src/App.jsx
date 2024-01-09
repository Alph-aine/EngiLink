import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Landing from './pages/Landing'
import SignIn from './pages/auth/signin'
import SignUp from './pages/auth/signup'
import ForgotPassword from './pages/auth/forgotpsw'
import UpdatePassword from './pages/auth/updatepsw'
import Profile from './pages/profile/page'
import EditProfile from './pages/profile/edit'
import CreateJob from './pages/createjob'
import Proposals from './pages/proposals/page'

const routerr = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Landing />}>
      <Route path='auth/signin' element={<SignIn />} />
      <Route path='auth/signup' element={<SignUp />} />
      <Route path='auth/forgotpassword' element={<ForgotPassword />} />
      <Route path='auth/updatepassword' element={<UpdatePassword />} />
      <Route path=':employerId/profile' element={<Profile />} />
      <Route path=':employerId/profile/edit' element={<EditProfile />} />
      <Route path=':employerId/createjob' element={<CreateJob />} />
      {/** view job route */}
      <Route path=':employerId/job/:jobId/proposals' element={<Proposals />} />
      <Route
        path='/:employerId/job/:jobId/proposals/proposal/:proposalId'
        element={<Proposals />}
      />
    </Route>
  )
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/auth/forgotpassword",
    element: <ForgotPassword />,
  },
])

export default router
