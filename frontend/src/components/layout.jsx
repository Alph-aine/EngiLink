import { useState } from 'react'
import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitterXLine,
} from 'react-icons/ri'
import { RxHamburgerMenu } from 'react-icons/rx'
import Button from './button'
import Text from './text'

export default function Layout({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div className='flex flex-col justify-start items-start w-full min-h-screen'>
      <header className='relative bg-primary md:px-8 px-4 py-5 w-full'>
        <div className='flex justify-between items-center gap-5'>
          <span className=''>
            <Text size='lg' white>
              ENGILINK
            </Text>
          </span>
          <span className='order-first lg:order lg:hidden block'>
            <RxHamburgerMenu
              onClick={() => setIsNavOpen((val) => !val)}
              className='text-xl text-white'
            />
          </span>
          <div
            className={`${
              isNavOpen ? 'absolute left-0 w-full top-[100%] flex bg-primary py-5' : 'hidden'
            } order-first lg:order-none shrink-0 lg:flex lg:flex-row flex-col justify-center items-center xl:gap-12 lg:gap-4 gap-3`}
          >
            <Text size='sm' white>
              JOBS
            </Text>
            <Text size='sm' white>
              ENGINEERS
            </Text>
            <Text size='sm' white>
              PROPOSALS
            </Text>
            <Text size='sm' white>
              COMMUNITY
            </Text>
          </div>
          <div className='shrink-0 flex justify-end items-center gap-3'>
            <Button
              cx='bg-bg-secondary lg:block hidden'
              onClick={() => console.log('Job created!')}
              textBlack
            >
              Post a job
            </Button>
            <span className='lg:block hidden'>
              <Text size='xl' white>
                |
              </Text>
            </span>
            <div className='shrink-0 flex justify-end items-center gap-2'>
              <div className='shrink-0 flex justify-center items-center w-8 h-8 bg-black rounded-full'>
                <Text size='sm' white>
                  LT
                </Text>
              </div>
              <span className='lg:block hidden'>
                <Text size='sm' white>
                  L. Thompson
                </Text>
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className='grow w-full bg-white xl:px-32 md:px-8 px-4 py-10'>
        {children}
      </main>
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
    </div>
  )
}
