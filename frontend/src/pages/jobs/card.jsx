import { IoLocationOutline } from "react-icons/io5"
import Text from '../../components/text'

export default function JobCard() {
  return (
    <div className='flex flex-col gap-5 w-full overflow-hidden py-12 border-b last:border-none border-bg-primary/40'>
      <Text size='xs' faded>
        Posted 4 hours ago
      </Text>
      <Text size='lg'>
        Buid A Bridge That Spans From Victoria Island To The Banana Island
      </Text>
      <div className='flex justify-start items-center gap-5'>
        <Text size='sm'>Salary: N20,000 - N40,000</Text>
        <div className='flex justify-start items-center gap-1'>
          <IoLocationOutline className='text-xl text-black/40' />
          <Text size='sm'>Enugu Ezike</Text>
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full'>
      <span className='md:line-clamp-3 line-clamp-2 w-full'>
        <Text size='sm' copy>
        In this exciting role as a [job title] at our dynamic company, you'll
        play a pivotal role in [briefly describe main responsibility]. You'll
        leverage your [mention relevant skills] to [describe specific task] and
        [another task], ensuring [desired outcome]. If you're a self-starter who
        thrives on challenges and enjoys collaborating with a talented team, we
        encourage you to apply! In return, you'll receive [mention attractive
        benefits] and the opportunity to [highlight career growth potential].</Text>
      </span>
      <div className='flex justify-start items-center gap-4 overflow-x-auto'>
        {['Technician', 'Software', 'Architect'].map((skill) => (
          <div className='md:px-4 px-3 md:py-2 py-1 rounded-md border border-bg-primary bg-white text-black'>
            <Text size='sm'>{skill}</Text>
          </div>
        ))}
      </div>
      </div>
      <div className='flex justify-start items-center gap-5'>
        <Text size='sm'>Type: Contract</Text>
        <Text size='sm'>Level: Entry Level</Text>
      </div>
    </div>
  )
}
