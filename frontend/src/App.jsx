import { createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing'
import SignIn from './pages/auth/signin'
import SignUp from './pages/auth/signup'
import ForgotPassword from './pages/auth/forgotpsw'
import UpdatePassword from './pages/auth/updatepsw'
import Profile from './pages/profile/page'
import EditProfile from './pages/profile/edit'
import Proposals from './pages/proposals/page'
import CreateJob from './pages/job/create'
import Proposal from './pages/proposals/proposal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/auth/signin',
    element: <SignIn />,
  },
  {
    path: '/auth/signup',
    element: <SignUp />,
  },
  {
    path: '/auth/forgotpassword',
    element: <ForgotPassword />,
  },
  {
    path: '/auth/updatepassword',
    element: <UpdatePassword />,
  },
  {
    path: '/:employerId/profile',
    element: <Profile />,
  },
  {
    path: '/:employerId/profile/edit',
    element: <EditProfile />,
  },
  {
    path: '/:employerId/job/create',
    element: <CreateJob />,
  },
  {
    path: '/:employerId/job/jobId/proposals',
    element: <Proposals />,
  },
  {
    path: '/:employerId/job/jobId/proposals/proposal/:proposalId',
    element: <Proposal />,
  },
])

export default router
