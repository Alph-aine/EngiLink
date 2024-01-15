import { createBrowserRouter } from 'react-router-dom'
import SignIn from './pages/auth/signin'
import SignUp from './pages/auth/signup'
import ForgotPassword from './pages/auth/forgotpsw'
import UpdatePassword from './pages/auth/updatepsw'
import Profile, { profileLoader } from './pages/profile/page'
import EditProfile from './pages/profile/edit'
import Proposals, { proposalsLoader } from './pages/proposals/page'
import CreateJob, { jobCreateLoader } from './pages/jobs/job/create'
import Proposal, { proposalLoader } from './pages/proposals/proposal'
import Lander from './pages/lander'
import Jobs, { jobsLoader } from './pages/jobs/page'
import Job, { jobLoader } from './pages/jobs/job/page'
import EditJob, { jobEditLoader } from './pages/jobs/job/edit'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Discover from './pages/Discover'
import EngineerProfile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Lander />,
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
    path: 'employer/:employerId/proposals',
    loader: proposalsLoader,
    element: <Proposals />,
  },
  {
    path: 'employer/:employerId/jobs/',
    loader: jobsLoader,
    element: <Jobs />,
  },
  {
    path: 'employer/:employerId/jobs/create',
    loader: jobCreateLoader,
    element: <CreateJob />,
  },
  {
    path: 'employer/:employerId/jobs/:jobId',
    loader: jobLoader,
    element: <Job />,
  },
  {
    path: 'employer/:employerId/jobs/:jobId/edit',
    loader: jobEditLoader,
    element: <EditJob />,
  },
  {
    path: 'employer/:employerId/jobs/:jobId/proposals/:proposalId',
    loader: proposalLoader,
    element: <Proposal />,
  },
  {
    path: 'engineer/auth/signin',
    element: <Login />,
  },
  {
    path: 'engineer/auth/signup',
    element: <Register />,
  },
  {
    path: 'engineer/home',
    loader: proposalLoader,
    element: <Home />,
  },
  {
    path: 'engineer/discover',
    element: <Discover />,
  },
  {
    path: 'engineer/profile',
    element: <EngineerProfile />,
  },
])

export default router
