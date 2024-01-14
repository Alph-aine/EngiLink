import Text from '../../components/text'

export default function ProposalCard() {
  return (
    <div className='grid md:grid-cols-5 grid-cols-1 md:gap-16 gap-4 place-items-stretch md:p-10 p-5 rounded-md bg-bg-secondary outline outline-white'>
      <img
        src='/imgs/profile-avatar.jpg'
        alt='avatar'
        className='rounded-md object-cover hidden lg:block'
      />
      <div className='md:col-span-3 colp-span-full flex flex-col gap-3'>
        <Text size='lg'>Jennie Yen</Text>
        <Text size='sm' copy clamp>
          Proposal
        </Text>
      </div>
      <div className='lg:col-span-1 md:col-span-2 col-span-full flex flex-col md:gap-7 gap-3'>
        <div className='flex md:flex-col flex-row md:items-start items-center md:gap-1 gap-3'>
          <Text size='xs' faded>
            Bid
          </Text>
          <div className=''>
            <Text size='lg'>$30</Text>&nbsp;
            <Text size='sm' faded>
              /
            </Text>
            &nbsp;
            <Text size='sm' faded>
              per hour
            </Text>
          </div>
        </div>
        <div className='flex md:flex-col md:items-start items-center md:gap-1 gap-3'>
          <Text size='xs' faded>
            Duration
          </Text>
          <Text size='sm'>&lt; 3 months</Text>
        </div>
      </div>
    </div>
  )
}
