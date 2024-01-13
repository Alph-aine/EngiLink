import { IoLocationOutline } from "react-icons/io5"
import Text from '../../components/text'
import { formatMoney, formatTimeAgo } from "../../lib/utils"

export default function JobCard({job}) {
  return (
    <div className='flex flex-col gap-5 w-full overflow-hidden py-12 border-b last:border-none border-bg-primary/40'>
      <Text size='xs' faded>
        posted {formatTimeAgo(job.postedAt)}
      </Text>
      <Text size='lg'>
        {job.title}
      </Text>
      <div className='flex justify-start items-center gap-5'>
        <Text size='sm'>Salary: {formatMoney(job.minSalary)} - {formatMoney(job.maxSalary)}</Text>
        <div className='flex justify-start items-center gap-1'>
          <IoLocationOutline className='text-xl text-black/40' />
          <Text size='sm'>{job.location}</Text>
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full'>
      <span className='md:line-clamp-3 line-clamp-2 w-full'>
        <Text size='sm' copy>
        {job.description}</Text>
      </span>
      <div className='flex justify-start items-center gap-4 overflow-x-auto'>
        {job.skillsRequired.split(', ').map((skill, id) => (
          <div key={job._id+id} className='md:px-4 px-3 md:py-2 py-1 rounded-md border border-bg-primary bg-white text-black'>
            <Text size='sm'>{skill}</Text>
          </div>
        ))}
      </div>
      </div>
      <div className='flex justify-start items-center gap-5'>
        <Text size='sm'>Type: {job.employmentType}</Text>
        <Text size='sm'>Level: {job.experienceLevel}</Text>
      </div>
    </div>
  )
}
