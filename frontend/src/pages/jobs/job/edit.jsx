import axios from 'axios'
import { useLoaderData, redirect, useNavigate } from 'react-router-dom'
import Button from '../../../components/button'
import Input from '../../../components/input'
import Layout from '../../../components/layout'
import Text from '../../../components/text'
import { useState } from 'react'
import { getLoggedInEmployer } from '../../../lib/auth'
import { formDataToJSON } from '../../../lib/utils'

export const jobEditLoader = async ({ params }) => {
  const { employerId, jobId } = params
  const user = await getLoggedInEmployer()
  if (!user) return redirect('/employer/auth/signin')
  if (user._id !== employerId)
    return redirect(`/employer/${user._id}/jobs/create`)

  let job = null

  try {
    const res = await axios.get(`http://localhost:3000/api/v1/jobs/${jobId}`, {
      withCredentials: true,
    })
    job = res.data
  } catch (e) {
    console.log('Error loading data')
  }

  if (!job) return redirect(`/employer/${employerId}/jobs`)
  return { job, user }
}

export default function EditJob() {
  const { job, user } = useLoaderData()
  const navigate = useNavigate()
  const [skills, setSkills] = useState(job.skillsRequired.split(', '))
  const [newSkill, setNewSkill] = useState('Engineer')
  const deadline = job.deadline ? new Date(job.deadline).toISOString().substring(0, 10) : new Date()

  const postJob = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const jsonData = formDataToJSON(formData)
    const postedAt = new Date()

    jsonData['skillsRequired'] = skills.join(', ')
    jsonData['postedAt'] = postedAt

    axios
      .put(`http://localhost:3000/api/v1/jobs/${job._id}`, jsonData, {
        withCredentials: true,
      })
      .then(() => navigate(`/employer/${user._id}/jobs/${job._id}`))
      .catch(() => console.error('An error occured'))
  }

  return (
    <Layout companyName={user.companyName}>
      <div className='flex flex-col lg:gap-10 gap-5 w-full text-center'>
        <Text size='xl'>
          Edit Job: <span className='break-words'>{job._id}</span>
        </Text>

        <form
          onSubmit={postJob}
          className='flex flex-col gap-7 lg:px-20 px-0 py-10'
        >
          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Title
            </Text>
            <Input
              type='text'
              name='title'
              placeholder='Title'
              defaultValue={job.title}
              required
            />
          </div>

          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Description
            </Text>
            <textarea
              rows={4}
              name='description'
              className='block w-full px-4 py-2 md:text-base text-sm border border-primary/40 rounded-lg focus:outline-none focus:border-2 focus:border-primary'
              placeholder='Description'
              defaultValue={job.description}
              required
            />
          </div>

          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Skills Required
            </Text>
            <div className='flex justify-start items-center gap-2 flex-wrap'>
              {skills.map((skill) => (
                <div
                  key={skill}
                  className='md:px-4 px-3 md:py-2 py-1 rounded-md border border-bg-primary/40 bg-white text-black'
                >
                  <Text size='sm'>{skill}</Text>
                </div>
              ))}
            </div>
            <div className='flex items-center gap-2'>
              <Input
                type='text'
                id='addSkill'
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder='Skills Required'
                required
              />
              <Button
                onClick={() => {
                  const newList = [
                    ...skills.filter((item) => item !== newSkill),
                    newSkill,
                  ]
                  setNewSkill('Engineer')
                  setSkills(newList)
                }}
              >
                Add
              </Button>
            </div>
          </div>
          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Experience Level
            </Text>
            <div className='flex flex-wrap justify-start items-center gap-7'>
              <label
                htmlFor='entry Level'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='experienceLevel'
                  id='entry Level'
                  value='Entry Level'
                  defaultChecked={job.experienceLevel === 'Entry Level'}
                />
                <Text size='sm'>Entry Level</Text>
              </label>
              <label
                htmlFor='mid Level'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='experienceLevel'
                  id='mid Level'
                  value='Mid Level'
                  defaultChecked={job.experienceLevel === 'Mid Level'}
                />
                <Text size='sm'>Mid Level</Text>
              </label>
              <label
                htmlFor='senior Level'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='experienceLevel'
                  id='senior Level'
                  value='Senior Level'
                  defaultChecked={job.experienceLevel === 'Senior Level'}
                />
                <Text size='sm'>Senior Level</Text>
              </label>
            </div>
          </div>
          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Employment Type
            </Text>
            <div className='flex flex-wrap justify-start items-center gap-7'>
              <label
                htmlFor='full time'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='employmentType'
                  id='full time'
                  value='Full Time'
                  defaultChecked={job.employmentType === 'Full Time'}
                />
                <Text size='sm'>Full Time</Text>
              </label>
              <label
                htmlFor='part time'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='employmentType'
                  id='part time'
                  value='Part Time'
                  defaultChecked={job.employmentType === 'Part Time'}
                />
                <Text size='sm'>Part Time</Text>
              </label>
              <label
                htmlFor='contract'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='employmentType'
                  id='contract'
                  value='Contract'
                  defaultChecked={job.employmentType === 'Contract'}
                />
                <Text size='sm'>Contract</Text>
              </label>
              <label
                htmlFor='internship'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='employmentType'
                  id='internship'
                  value='Internship'
                  defaultChecked={job.employmentType === 'Internship'}
                />
                <Text size='sm'>Internship</Text>
              </label>
              <label
                htmlFor='remote'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='employmentType'
                  id='remote'
                  value='Remote'
                  defaultChecked={job.employmentType === 'Remote'}
                />
                <Text size='sm'>Remote</Text>
              </label>
            </div>
          </div>
          <div className='flex flex-col lg:gap-2 gap-3 text-left'>
            <Text size='sm' faded>
              Salary
            </Text>
            <div className='flex lg:flex-row flex-col justify-start lg:items-center items-start lg:gap-10 gap-4'>
              <label
                htmlFor='minSalary'
                className='flex justify-start items-center gap-2'
              >
                <Text size='sm' faded>
                  min:
                </Text>
                <div className='flex justify-center items-center gap-1'>
                  <Text size='sm'>$</Text>
                  <Input
                    type='number'
                    name='minSalary'
                    id='minSalary'
                    placeholder='eg: 500'
                    defaultValue={job.minSalary}
                    required
                  />
                </div>
              </label>
              <span className='lg:block hidden'>
                <Text size='sm' faded>
                  &mdash; to &mdash;
                </Text>
              </span>
              <label
                htmlFor='maxSalary'
                className='flex justify-start items-center gap-2'
              >
                <Text size='sm' faded>
                  max:
                </Text>
                <div className='flex justify-center items-center gap-1'>
                  <Text size='sm'>$</Text>
                  <Input
                    type='number'
                    name='maxSalary'
                    id='maxSalary'
                    placeholder='eg: 500'
                    defaultValue={job.maxSalary}
                    required
                  />
                </div>
              </label>
            </div>
          </div>
          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Location
            </Text>
            <Input
              type='text'
              name='location'
              placeholder='Location'
              defaultValue={job.location}
              required
            />
          </div>
          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Deadline
            </Text>
            <Input
              type='date'
              name='deadline'
              placeholder='Deadline'
              defaultValue={deadline}
              required
            />
          </div>
          <Button type='submit' cx='bg-primary md:w-fit w-full mx-auto mt-10'>
            Update Job
          </Button>
        </form>
      </div>
    </Layout>
  )
}
