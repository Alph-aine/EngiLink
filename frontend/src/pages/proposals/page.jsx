import {
  Link,
  redirect,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom'
import axios from 'axios'
import Text from '../../components/text'
import ProposalCard from './card'
import DropDown, { DropItem } from '../../components/dropdown'
import Layout from '../../components/layout'
import { useEffect, useState } from 'react'
import { getLoggedInEmployer } from '../../lib/auth'
import { fetchEmployerJobs } from '../../lib/job'
import useNotification from '../../hooks/usenotification'
import Notification from '../../components/notification'

export const proposalsLoader = async ({ params }) => {
  const { employerId } = params

  const user = await getLoggedInEmployer()
  if (!user)
    return redirect(
      `/employer/auth/signin?msg=${'You must login first'}&msgType=${'TIP'}`
    )

  const jobs = await fetchEmployerJobs(user._id)
  if (!jobs)
    return redirect(
      `/employer/${employerId}/profile?msg=${'Error loading proposals'}&msgType=${'BAD'}`
    )

  return { jobs, user }
}

export default function Proposals() {
  const { jobs, user } = useLoaderData()
  const [params, setSearchParams] = useSearchParams()
  const { notifications, removeNotif, addNotif } = useNotification(
    params.get('msg'),
    params.get('msgType')
  )
  const [selectedJob, setSelectedJob] = useState(jobs[0]._id)
  const [proposals, setProposals] = useState([])
  const [loadingProposals, setLoadingProposals] = useState(true)

  useEffect(() => {
    setLoadingProposals(true)

    axios
      .get(`https://engilink.vercel.app:3000/pi/v1/jobs/${selectedJob}/proposals`, {
        withCredentials: true,
      })
      .then((res) => setProposals(res.data))
      .catch(() => {
        addNotif({
          message: e.response.data.message ?? e.response.statusText,
          signal: 'BAD',
        })
      })
      .finally(() => setLoadingProposals(false))
  }, [selectedJob])

  return (
    <Layout companyName={user.companyName}>
      <Notification notifications={notifications} remove={removeNotif} />
      <div className='flex flex-col gap-20'>
        <div className='flex flex-col gap-3'>
          <Text size='md'>Select a Job</Text>
          <DropDown
            title='Choose from your posted jobs'
            initialActive={selectedJob}
          >
            {jobs.map((job) => (
              <DropItem
                key={job._id}
                value={job._id}
                onClick={() => setSelectedJob(job._id)}
              >
                {job.title}
              </DropItem>
            ))}
          </DropDown>
        </div>
        <div className='flex flex-col gap-24'>
          {loadingProposals ? (
            <div className='flex justify-center items-center'>
              <Text size='sm'>Loading Proposals. Please wait...</Text>
            </div>
          ) : proposals.length < 1 ? (
            <div className='flex justify-center items-center'>
              <Text size='sm'>No proposals found, choose another job</Text>
            </div>
          ) : (
            <div className='flex flex-col gap-10'>
              {proposals.map((proposal) => (
                <Link
                  key={proposal._id}
                  to={`/employer/${user._id}/jobs/${selectedJob}/proposals/${proposal._id}`}
                >
                  <ProposalCard proposal={proposal} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
