import { IoLocationOutline, IoTrashBinOutline } from 'react-icons/io5'
import Text from '../../../components/text'
import Layout from '../../../components/layout'
import { BsCurrencyDollar } from 'react-icons/bs'
import { RiEditBoxLine, RiUserSettingsLine } from 'react-icons/ri'
import Button from '../../../components/button'

export default function Job() {
  return (
    <Layout>
      <div className='flex flex-col w-full'>
        <div className='flex md:justify-start justify-center items-center gap-4'>
          <Button>
            <span className='flex gap-2 justify-center items-center'>
              <RiEditBoxLine className='text-lg text-white' />
              <Text size='sm' white>
                Edit
              </Text>
            </span>
          </Button>
          <Button cx='bg-red-500'>
            <span className='flex gap-2 justify-center items-center'>
              <IoTrashBinOutline className='text-lg text-white' />
              <Text size='sm' white>
                Delete
              </Text>
            </span>
          </Button>
        </div>
        <div className='md:px-16 px-0 flex flex-col'>
          <div className='flex flex-col w-full gap-6 md:py-16 py-8 border-b border-bg-primary/40'>
            <Text size='lg' copy>
              Build A Bridge That Spans From Lagos Island To Lekki and VI
            </Text>
            <div className='flex items-center gap-8'>
              <Text size='sm'>Posted 4 hours ago</Text>
              <div className='flex items-center gap-2'>
                <IoLocationOutline className='text-xl text-black/60' />
                <Text size='sm'>Enugu Ezike</Text>
              </div>
            </div>
          </div>
          <span className='w-full md:py-16 py-8 border-b border-bg-primary/40'>
            <Text size='sm' copy>
              In this exciting role as a [job title] at our dynamic company,
              you'll play a pivotal role in [briefly describe main
              responsibility]. You'll leverage your [mention relevant skills] to
              [describe specific task] and [another task], ensuring [desired
              outcome]. If you're a self-starter who thrives on challenges and
              enjoys collaborating with a talented team, we encourage you to
              apply! In return, you'll receive [mention attractive benefits] and
              the opportunity to [highlight career growth potential].
            </Text>
          </span>
          <div className='flex md:flex-row flex-col md:items-center flex-wrap md:gap-16 gap-8 md:py-16 py-8 border-b border-bg-primary/40'>
            <div className='flex gap-3 items-start'>
              <BsCurrencyDollar className='text-3xl text-bg-primary' />
              <div className='flex flex-col items-start gap-1'>
                <Text size='lg'>N200,000 &mdash; N300,000</Text>
                <Text size='sm' faded>
                  Salary
                </Text>
              </div>
            </div>
            <div className='flex gap-3 items-start'>
              <RiUserSettingsLine className='text-3xl text-bg-primary' />
              <div className='flex flex-col items-start gap-1'>
                <Text size='lg'>Intermidate</Text>
                <Text size='sm' faded>
                  Level
                </Text>
              </div>
            </div>
          </div>
          <div className='md:py-16 py-8 border-b border-bg-primary/40'>
            <div className='flex items-center gap-3'>
              <b>
                <Text size='sm'>Project Type:</Text>
              </b>
              <Text size='md'>Contract</Text>
            </div>
          </div>
          <div className='md:py-16 py-8 border-b border-bg-primary/40'>
            <div className='flex flex-col items-start gap-3'>
              <Text size='lg'>Skills and Expertise</Text>
              <div className='flex flex-wrap justify-start items-center gap-4'>
                {['Technician', 'Software', 'Architect'].map((skill) => (
                  <div className='md:px-4 px-3 md:py-2 py-1 rounded-md bg-bg-secondary text-black'>
                    <Text size='sm'>{skill}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='md:py-16 py-8 border-b border-bg-primary/40'>
            <div className='flex flex-col items-start gap-3'>
              <Text size='lg'>Activity on this job</Text>
              <div className='flex flex-col w-full gap-4'>
                <div className='flex items-center gap-3'>
                  <b>
                    <Text size='sm'>Proposals:</Text>
                  </b>
                  <Text size='md'>20</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
