import { HiDocument, HiUser } from 'react-icons/hi2'
import Text from '../../components/text'
import { BsCurrencyDollar } from 'react-icons/bs'

export default function ProposalCard({ proposal }) {
  const { price, coverLetter, engineer } = proposal

  return (
    <div className='grid md:grid-cols-5 grid-cols-1 md:gap-16 gap-4 place-items-stretch md:p-10 p-5 rounded-md bg-bg-secondary outline outline-white'>
      <img
        src='/imgs/profile-avatar.jpg'
        alt='avatar'
        className='rounded-md object-cover hidden lg:block'
      />
      <div className='md:col-span-3 colp-span-full flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-start items-center gap-1 capitalize'>
            <HiUser className='md:text-base text-sm text-black/40' />
            <Text size='xs'>User</Text>
          </div>
          <span className='line-clamp-1 md:line-clamp-2'>
            <Text size='sm'>{engineer}</Text>
          </span>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-start items-center gap-1 capitalize'>
            <HiDocument className='md:text-base text-sm text-black/40' />
            <Text size='xs'>Letter</Text>
          </div>
          <span className='line-clamp-2 md:line-clamp-3'>
            <Text size='sm' copy>
              {coverLetter}
            </Text>
          </span>
        </div>
      </div>
      <div className='lg:col-span-1 md:col-span-2 col-span-full flex flex-col md:gap-7 gap-3'>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-start items-center gap-1 capitalize'>
            <BsCurrencyDollar className='md:text-base text-sm text-black/40' />
            <Text size='xs'>Bid</Text>
          </div>
          <span className='line-clamp-2 md:line-clamp-3'>
            <Text size='lg'>{price}</Text>
          </span>
        </div>
      </div>
    </div>
  )
}
