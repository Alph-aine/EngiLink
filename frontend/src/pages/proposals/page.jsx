import { Link, redirect, useLoaderData } from 'react-router-dom'
import axios from 'axios'
import Text from '../../components/text'
import ProposalCard from './card'
import DropDown, { DropItem } from '../../components/dropdown'
import Layout from '../../components/layout'
import { useEffect, useState } from 'react'
import { getLoggedInEmployer } from '../../lib/auth'
import { fetchEmployerJobs } from '../../lib/job'

export const proposalsLoader = async ({ params }) => {
  const { employerId } = params

  const user = await getLoggedInEmployer()
  if (!user) return redirect('/employer/auth/signin')

  const jobs = await fetchEmployerJobs(user._id)
  if (!jobs) return redirect(`/employer/${employerId}/jobs/create`)

  return { jobs, user }
}

export default function Proposals() {
  const { jobs, user } = useLoaderData()
  const [selectedJob, setSelectedJob] = useState(jobs[0]._id)
  const [proposals, setProposals] = useState([])
  const [loadingProposals, setLoadingProposals] = useState(true)

  useEffect(() => {
    setLoadingProposals(true)

    axios
      .get(`http://localhost:3000/api/v1/jobs/${selectedJob}/proposals`, {
        withCredentials: true,
      })
      .then((res) => setProposals(res.data))
      .catch(() => console.log('An error occurred while loading proposals'))
      .finally(() => setLoadingProposals(false))
  }, [selectedJob])

  return (
    <Layout companyName={user.companyName}>
      <div className='flex flex-col gap-20'>
        <div className='flex flex-col gap-3'>
          <Text size='md'>Select a Job</Text>
          <DropDown
            title='Choose from your posted jobs'
            initialActive={selectedJob}
          >
            {jobs.map((job) => (
              <DropItem
                key={job._Id}
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
          ) : (
            <div className='flex flex-col gap-10'>
              {proposals.map((proposal) => (
                <Link
                  key={proposal._id}
                  to={`/employer/{user._Id}/jobs/${selectedJob}/proposal/${proposal._id}`}
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
