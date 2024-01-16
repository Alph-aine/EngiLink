import { useLoaderData, useNavigate, redirect } from 'react-router-dom'
import axios from 'axios'
import { IoLocationOutline, IoTrashBinOutline } from 'react-icons/io5'
import Text from '../../../components/text'
import Layout from '../../../components/layout'
import { BsBriefcase, BsCurrencyDollar, BsHourglass } from 'react-icons/bs'
import { RiEditBoxLine, RiUserSettingsLine } from 'react-icons/ri'
import Button from '../../../components/button'
import { formatMoney, formatTimeAgo } from '../../../lib/utils'
import { getLoggedInEmployer } from '../../../lib/auth'
import { useState } from 'react'
import useNotification from '../../../hooks/usenotification'
import Notification from '../../../components/notification'

export const jobLoader = async ({ params }) => {
  const { employerId, jobId } = params
  const user = await getLoggedInEmployer()
  if (!user)
    return redirect(
      `/employer/auth/signin?msg=${'You must login first'}&msgType=${'TIP'}`
    )

  let job = null

  try {
    const res = await axios.get(`https://engilink.vercel.app/api/v1/jobs/${jobId}`, {
      withCredentials: true,
    })
    job = res.data
  } catch (e) {
    console.log('Error loading data')
  }

  if (!job)
    return redirect(
      `/employer/${employerId}/jobs?msg=${'Error loading job'}&msgType=${'BAD'}`
    )
  return { job, user }
}

export default function Job() {
  const navigate = useNavigate()
  const { job, user } = useLoaderData()
  const [deleting, setDeleting] = useState(false)
  const { notifications, removeNotif, addNotif } = useNotification()

  const deleteJob = () => {
    setDeleting(true)

    axios
      .delete(`https://engilink.vercel.app/api/v1/jobs/${job._id}`, {
        withCredentials: true,
      })
      .then(() => navigate(`/employer/${user._id}/jobs`, { replace: true }))
      .catch((e) => {
        addNotif({
          message: e.response.data.message ?? e.response.statusText,
          signal: 'BAD',
        })
      })
      .finally(() => setDeleting(false))
  }

  return (
    <Layout companyName={user.companyName}>
      <Notification notifications={notifications} remove={removeNotif} />
      <div className='flex flex-col w-full'>
        <div className='md:px-16 px-0 flex md:justify-start justify-center items-center gap-4'>
          <Button
            onClick={() =>
              navigate(`/employer/${user._id}/jobs/${job._id}/edit`)
            }
          >
            <span className='flex gap-2 justify-center items-center'>
              <RiEditBoxLine className='text-lg text-white' />
              <Text size='sm' white>
                Edit
              </Text>
            </span>
          </Button>
          <Button cx='bg-red-500' onClick={deleteJob}>
            <span className='flex gap-2 justify-center items-center'>
              <IoTrashBinOutline className='text-lg text-white' />
              <Text size='sm' white>
                {deleting ? 'Deleting' : 'Delete'}
              </Text>
            </span>
          </Button>
        </div>
        <div className='md:px-16 px-0 flex flex-col'>
          <div className='flex flex-col w-full gap-6 md:py-16 py-8 border-b border-bg-primary/40'>
            <Text size='lg' copy>
              {job.title}
            </Text>
            <div className='flex items-center gap-8'>
              <Text size='sm'>Posted {formatTimeAgo(job.postedAt)}</Text>
              <div className='flex items-center gap-1'>
                <IoLocationOutline className='md:text-lg text-base text-black/60' />
                <Text size='sm'>{job.location}</Text>
              </div>
            </div>
          </div>
          <span className='w-full md:py-16 py-8 border-b border-bg-primary/40'>
            <Text size='sm' copy>
              {job.description}
            </Text>
          </span>
          <div className='flex md:flex-row flex-col md:items-center flex-wrap md:gap-16 gap-8 md:py-16 py-8 border-b border-bg-primary/40'>
            <div className='flex gap-3 items-start'>
              <BsCurrencyDollar className='text-3xl text-bg-primary' />
              <div className='flex flex-col items-start gap-1'>
                <Text size='lg'>
                  {formatMoney(job.minSalary)} &mdash;{' '}
                  {formatMoney(job.maxSalary)}
                </Text>
                <Text size='sm' faded>
                  Salary
                </Text>
              </div>
            </div>
            <div className='flex gap-3 items-start'>
              <RiUserSettingsLine className='text-3xl text-bg-primary' />
              <div className='flex flex-col items-start gap-1'>
                <Text size='lg'>{job.experienceLevel}</Text>
                <Text size='sm' faded>
                  Experience
                </Text>
              </div>
            </div>
            <div className='flex gap-3 items-start'>
              <BsBriefcase className='text-3xl text-bg-primary' />
              <div className='flex flex-col items-start gap-1'>
                <Text size='lg'>{job.employmentType}</Text>
                <Text size='sm' faded>
                  Employment
                </Text>
              </div>
            </div>
            <div className='flex gap-3 items-start'>
              <BsHourglass className='text-3xl text-bg-primary' />
              <div className='flex flex-col items-start gap-1'>
                <Text size='lg'>{new Date(job.deadline).toLocaleString()}</Text>
                <Text size='sm' faded>
                  Deadline
                </Text>
              </div>
            </div>
          </div>
          <div className='md:py-16 py-8'>
            <div className='flex flex-col items-start gap-3'>
              <Text size='lg'>Skills and Expertise</Text>
              <div className='flex flex-wrap justify-start items-center gap-4'>
                {job.skillsRequired.split(',').map((skill) => (
                  <div
                    key={skill}
                    className='shrink-0 md:px-4 px-3 md:py-2 py-1 rounded-md bg-bg-secondary text-black'
                  >
                    <Text size='sm'>{skill}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
