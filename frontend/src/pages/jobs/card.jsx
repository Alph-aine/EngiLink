import { IoLocationOutline } from 'react-icons/io5'
import Text from '../../components/text'
import { formatMoney, formatTimeAgo } from '../../lib/utils'
import { BsBriefcase, BsCurrencyDollar } from 'react-icons/bs'
import { RiUserSettingsLine } from 'react-icons/ri'

export default function JobCard({ job }) {
  return (
    <div className='flex flex-col gap-5 w-full overflow-hidden'>
      <Text size='xs' faded>
        posted {formatTimeAgo(job.postedAt)}
      </Text>
      <span className='hover:underline hover:underline-offset-4 hover:text-primary capitalize'>
        <Text size='lg'>{job.title}</Text>
      </span>
      <div className='flex justify-start items-center gap-5'>
        <div className='flex justify-start items-center gap-1 capitalize'>
          <BsCurrencyDollar className='md:text-lg text-base text-black/40' />
          <Text size='sm'>
            {formatMoney(job.minSalary)} - {formatMoney(job.maxSalary)}
          </Text>
        </div>
        <div className='flex justify-start items-center gap-1 capitalize'>
          <IoLocationOutline className='md:text-lg text-base text-black/40' />
          <Text size='sm'>{job.location}</Text>
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <span className='md:line-clamp-3 line-clamp-2 w-full'>
          <Text size='sm' copy>
            {job.description}
          </Text>
        </span>
        <div className='flex justify-start items-center gap-4 overflow-x-auto'>
          {job.skillsRequired.split(', ').map((skill, id) => (
            <div
              key={job._id + id}
              className='shrink-0 md:px-4 px-3 md:py-2 py-1 rounded-md border border-bg-primary bg-white text-black line-clamp-1'
            >
              <Text size='sm'>{skill}</Text>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-start items-center gap-5'>
        <div className='flex justify-start items-center gap-1 capitalize'>
          <BsBriefcase className='md:text-lg text-base text-black/40' />
          <Text size='sm'>{job.employmentType}</Text>
        </div>
        <div className='flex justify-start items-center gap-1 capitalize'>
          <RiUserSettingsLine className='md:text-lg text-base text-black/40' />
          <Text size='sm'> {job.experienceLevel}</Text>
        </div>
      </div>
    </div>
  )
}
