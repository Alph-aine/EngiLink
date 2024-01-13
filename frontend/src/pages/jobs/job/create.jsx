import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from '../../../components/button'
import Input from '../../../components/input'
import Layout from '../../../components/layout'
import Text from '../../../components/text'
import { useState } from 'react'

export default function CreateJob() {
  const { employerId } = useParams()
  const [skills, setSkills] = useState(['Engineer'])
  const [newSkill, setNewSkill] = useState('Engineer')

  const postJob = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const postedAt = new Date()
    formData['postedAt'] = postedAt

    formData.append('postedAt', postedAt)
    formData.append('skillsRequired', skills)

    axios
      .post('http://localhost:3000/api/v1/jobs/', formData, {
        withCredentials: true,
      })
      .then(() => navigate(`/employer/${employerId}/jobs`))
      .catch(() => console.error('An error occured'))
  }

  return (
    <Layout>
      <div className='flex flex-col lg:gap-10 gap-5 w-full text-center'>
        <Text size='xl'>Create A Job</Text>

        <form
          onSubmit={postJob}
          className='flex flex-col gap-7 lg:px-20 px-0 py-10'
        >
          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Title
            </Text>
            <Input type='text' name='title' placeholder='Title' required />
          </div>

          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Description
            </Text>
            <textarea
              rows={4}
              className='block w-full px-4 py-2 md:text-base text-sm border border-primary/40 rounded-lg focus:outline-none focus:border-2 focus:border-primary'
              placeholder='Description'
              required
            />
          </div>

          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Skills Required
            </Text>
            <div className='flex justify-start items-center gap-4 flex-wrap'>
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
                  name='xp'
                  id='entry Level'
                  value='entry Level'
                  defaultChecked
                />
                <Text size='sm'>Entry Level</Text>
              </label>
              <label
                htmlFor='mid Level'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='xp'
                  id='mid Level'
                  value='mid Level'
                />
                <Text size='sm'>Mid Level</Text>
              </label>
              <label
                htmlFor='senior Level'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='xp'
                  id='senior Level'
                  value='senior Level'
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
                  name='employment'
                  id='full time'
                  value='full time'
                  defaultChecked
                />
                <Text size='sm'>Full Time</Text>
              </label>
              <label
                htmlFor='part time'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='employment'
                  id='part time'
                  value='part time'
                />
                <Text size='sm'>Part Time</Text>
              </label>
              <label
                htmlFor='contract'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='employment'
                  id='contract'
                  value='contract'
                />
                <Text size='sm'>Contract</Text>
              </label>
              <label
                htmlFor='internship'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='employment'
                  id='internship'
                  value='internship'
                />
                <Text size='sm'>Internship</Text>
              </label>
              <label
                htmlFor='remote'
                className='flex justify-start items-center gap-2 p-3 border border-primary/40 focus:border-2 focus:border-primary rounded-md'
              >
                <input
                  type='radio'
                  name='employment'
                  id='remote'
                  value='remote'
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
              required
            />
          </div>
          <div className='flex flex-col gap-2 text-left'>
            <Text size='sm' faded>
              Deadline
            </Text>
            <Input
              type='date'
              name='location'
              placeholder='Location'
              required
            />
          </div>
          <Button type='submit' cx='bg-primary md:w-fit w-full mx-auto mt-10'>
            Post Job
          </Button>
        </form>
      </div>
    </Layout>
  )
}
