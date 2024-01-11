import { createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing'
import SignIn from './pages/auth/signin'
import SignUp from './pages/auth/signup'
import ForgotPassword from './pages/auth/forgotpsw'
import UpdatePassword from './pages/auth/updatepsw'
import Profile, { profileLoader } from './pages/profile/page'
import EditProfile from './pages/profile/edit'
import Proposals, { proposalsLoader } from './pages/proposals/page'
import CreateJob from './pages/jobs/job/create'
import Proposal, { proposalLoader } from './pages/proposals/proposal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: 'employer/auth/signin',
    element: <SignIn />,
  },
  {
    path: 'employer/auth/signup',
    element: <SignUp />,
  },
  {
    path: 'employer/auth/forgotpassword',
    element: <ForgotPassword />,
  },
  {
    path: 'employer/auth/updatepassword',
    element: <UpdatePassword />,
  },
  {
    path: 'employer/:employerId/profile',
    loader: profileLoader,
    element: <Profile />,
  },
  {
    path: 'employer/:employerId/profile/edit',
    element: <EditProfile />,
  },
  {
    path: 'employer/:employerId/job/create',
    element: <CreateJob />,
  },
  {
    path: 'employer/:employerId/job/:jobId/proposals',
    loader: proposalsLoader,
    element: <Proposals />,
  },
  {
    path: 'employer/:employerId/job/:jobId/proposals/proposal/:proposalId',
    loader: proposalLoader,
    element: <Proposal />,
  },
])

export default router
