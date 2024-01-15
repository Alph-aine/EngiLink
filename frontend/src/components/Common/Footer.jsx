import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitterXLine,
} from 'react-icons/ri'
import Text from "../text"

const Footer = () => {
  return (
    <footer className='bg-bg-primary w-full xl:px-32 lg:px-24 md:px-8 px-4'>
        <div className='grid lg:grid-cols-2 grid-cols-1 place-items-stretch gap-16 py-8'>
          <div className='grid md:grid-cols-2 grid-cols-1 place-items-stretch gap-5'>
            <div className='flex flex-col gap-3 w-full'>
              <Text size='md' white>
                ENGILINK
              </Text>
              <Text size='sm' copy white>
                The gap between you and your next completed project.
              </Text>
              <div className='flex justify-start items-center gap-6 w-full'>
                <RiFacebookCircleLine className='text-2xl text-white' />
                <RiInstagramLine className='text-2xl text-white' />
                <RiTwitterXLine className='text-2xl text-white' />
              </div>
            </div>
          </div>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
            <div className='flex flex-col md:gap-3 gap-2 w-full'>
              <Text size='md' white>
                PLATFORM
              </Text>
              <div className='flex flex-col gap-1'>
                <Text size='sm' white>
                  Create a Job
                </Text>
                <Text size='sm' white>
                  Find Engineer
                </Text>
                <Text size='sm' white>
                  Engineers
                </Text>
              </div>
            </div>
            <div className='flex flex-col md:gap-3 gap-2 w-full'>
              <Text size='md' white>
                COMPANY
              </Text>
              <div className='flex flex-col gap-1'>
                <Text size='sm' white>
                  About
                </Text>
                <Text size='sm' white>
                  Privacy Policy
                </Text>
              </div>
            </div>
            <div className='flex flex-col md:gap-3 gap-2 w-full'>
              <Text size='md' white>
                SUPPORT
              </Text>
              <div className='flex flex-col gap-1'>
                <Text size='sm' white>
                  Help
                </Text>
                <Text size='sm' white>
                  Contact
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className='py-8 w-full flex justify-center items-center'>
          <Text size='sm' white>
            &copy;2024 Engilink All Rights Reserved
          </Text>
        </div>
      </footer>
  )
}

export default Footer