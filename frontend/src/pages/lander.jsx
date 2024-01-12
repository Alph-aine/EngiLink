import { useState } from 'react'
import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitterXLine,
} from 'react-icons/ri'
import { RxHamburgerMenu } from 'react-icons/rx'
import Button from '../components/button'
import Text, { TextLink } from '../components/text'
import { TfiArrowRight } from 'react-icons/tfi'
import { BsSendCheck } from 'react-icons/bs'
import { TbFilterBolt } from 'react-icons/tb'
import { TiGroupOutline } from 'react-icons/ti'

export default function Lander() {
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
              isNavOpen
                ? 'absolute left-0 w-full top-[100%] flex bg-primary py-5'
                : 'hidden'
            } order-first lg:order-none shrink-0 lg:flex lg:flex-row flex-col justify-center items-center xl:gap-12 lg:gap-4 gap-3`}
          >
            <Text size='sm' white>
              HOME
            </Text>
            <Text size='sm' white>
              ABOUT
            </Text>
            <Text size='sm' white>
              BLOG
            </Text>
            <div className='lg:hidden flex flex-col gap-3 w-full md:px-8 px-4'>
              <Button
                cx='bg-bg-secondary w-full'
                onClick={() => console.log('Job created!')}
                textBlack
              >
                Find a Job
              </Button>
              <Button
                cx='bg-bg-secondary w-full'
                onClick={() => console.log('Job created!')}
                textBlack
              >
                Post a Job
              </Button>
            </div>
          </div>
          <div className='shrink-0 flex justify-end items-center xl:gap-6 gap-3'>
            <Button
              cx='bg-bg-secondary lg:block hidden'
              onClick={() => console.log('Job created!')}
              textBlack
            >
              Find a job
            </Button>
            <Button
              cx='bg-bg-secondary lg:block hidden'
              onClick={() => console.log('Job created!')}
              textBlack
            >
              Post a job
            </Button>
          </div>
        </div>
      </header>
      <main className='grow w-full'>
        <div
          className={`w-full bg-[url('/imgs/team.jpg')] bg-cover bg-no-repeat bg-center bg-blend-darken`}
        >
          <div className='xl:px-32 md:px-8 px-4 py-32 bg-black/50 w-full flex flex-col gap-10 items-center justify-center'>
            <div className='text-center w-full'>
              <span className='text-white xl:text-8xl lg:text-7xl md:text-6xl text-4xl font-medium leading-snug uppercase'>
                Empower Engineers &amp; Streamline Hiring
              </span>
            </div>
            <Button cx='bg-bg-secondary'>
              <span className='flex gap-2 items-center'>
                <Text size='sm'>Get Started</Text>
                <TfiArrowRight className='text-xl text-bg-primary' />
              </span>
            </Button>
          </div>
        </div>
        <div className='xl:px-32 md:px-8 px-4 md:py-16 py-10 w-full bg-primary'>
          <div className='flex md:flex-row flex-col  justify-center items-center md:gap-20 gap-10 text-center'>
            <div className='flex flex-col items-center gap-4'>
              <BsSendCheck className='text-7xl text-bg-secondary' />
              <Text size='lg' white>
                <span className='text-bg-secondary'>Simple job posting</span>
              </Text>
            </div>
            <div className='flex flex-col items-center gap-4'>
              <TbFilterBolt className='text-7xl text-bg-secondary' />
              <Text size='lg' white>
                <span className='text-bg-secondary'>Optimized Filter</span>
              </Text>
            </div>
            <div className='flex flex-col items-center gap-4'>
              <TiGroupOutline className='text-7xl text-bg-secondary' />
              <Text size='lg' white>
                <span className='text-bg-secondary'>Helpful Community</span>
              </Text>
            </div>
          </div>
        </div>
        <div className='xl:px-32 md:px-8 px-4 lg:py-10 py-8 w-full'>
          <div className='grid xl:grid-cols-12 lg:grid-cols-10 gap-8 lg:h-[35rem] min-h-[20rem]'>
            <div className='lg:col-span-4 md:col-span-3 bg-white w-full h-full flex justify-center items-center'>
              <div className='md:text-left text-center grow flex flex-col justify-between md:items-start items-center gap-5'>
                <Text size='xl' copy>
                  Find top talent faster
                </Text>
                <div className='md:text-left text-center flex justify-start gap-2'>
                  <Text size='md'>
                    Skip resumes and get proposals showcasing skills and
                    passion.
                  </Text>
                </div>
                <Button
                  cx='bg-primary md:w-fit w-full'
                  onClick={() => console.log('signed up!')}
                >
                  Sign up as employer
                </Button>
                <TextLink to='/employer/auth/signup'>Learn more</TextLink>
              </div>
            </div>
            <div
              className={`bg-[url('/imgs/group.jpg')] bg-cover bg-no-repeat bg-right lg:col-start-5 md:col-start-4 md:col-end-13 md:h-auto h-[20rem]`}
            />
          </div>
        </div>
        <div className='xl:px-32 md:px-8 px-4 lg:py-10 py-8 w-full'>
          <div className='grid xl:grid-cols-12 lg:grid-cols-10 lg:gap-20 md:gap-10 gap-0 lg:h-[35rem] min-h-[20rem]'>
            <div
              className={`bg-[url('/imgs/login-pic.jpg')] bg-cover bg-no-repeat bg-right xl:col-span-8 lg:col-span-6 md:block hidden`}
            />
            <div className='lg:col-span-4 md:col-span-3 bg-white w-full h-full flex justify-center items-center'>
              <div className='md:text-left text-center grow flex flex-col justify-between md:items-start items-center gap-5'>
                <Text size='xl' copy>
                  Land your dream job
                </Text>
                <div className='md:text-left text-center flex justify-start gap-2'>
                  <Text size='md'>
                    Get hired based on merit and potential, not just a resume.
                  </Text>
                </div>
                <Button
                  cx='bg-primary md:w-fit w-full'
                  onClick={() => console.log('signed up!')}
                >
                  Sign up as engineer
                </Button>
                <TextLink to='/signup'>Learn more</TextLink>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-full h-[30rem] bg-[url('/imgs/handshake.jpg')] bg-cover bg-no-repeat bg-center bg-blend-darken`}
        >
          <div className='w-full h-full xl:px-32 md:px-8 px-4 flex justify-center items-center text-center'>
            <span className='text-primary xl:text-8xl lg:text-7xl md:text-6xl text-5xl font-medium leading-snug uppercase'>
              We Bridge The Gap
            </span>
          </div>
        </div>
      </main>
      <footer className='bg-bg-primary w-full xl:px-32 lg:px-24 md:px-8 px-4'>
        <div className='grid lg:grid-cols-2 grid-cols-1 place-items-stretch gap-16 py-8'>
          <div className='grid md:grid-cols-2 grid-cols-1 place-items-stretch gap-5'>
            <div className='flex flex-col gap-3 w-full'>
              <Text size='md' white>
                ENGILINK
              </Text>
              <Text size='sm' copy white>
                The bridge between you and your next completed project.
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
