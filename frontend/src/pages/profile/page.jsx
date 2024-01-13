import { BsGlobe } from 'react-icons/bs'
import { TfiStar } from 'react-icons/tfi'
import { RiMailLine } from 'react-icons/ri'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import axios from 'axios'
import { useLoaderData, redirect } from 'react-router-dom'
import Button from '../../components/button'
import Text from '../../components/text'
import Layout from '../../components/layout'
import { getLoggedInEmployer } from '../../lib/auth'

export const profileLoader = async ({ params }) => {
  const user = getLoggedInEmployer()
  if (!user) return redirect('/employer/auth/signin')
  
  let profileData = null

  try {
    const res = await axios.get(
      `http://localhost:3000/api/v1/employer/id/${params.employerId}`,
      { withCredentials: true }
    )

    profileData = res.data?.employer
  } catch (e) {
    console.log('Error loading data')
  }

  return profileData
}

export default function Profile() {
  const profileData = useLoaderData()

  return (
    <Layout>
      <div className='grid md:grid-cols-12 grid-cols-1 place-items-stretch gap-16 lg:px-20 px-0'>
        <div className='xl:col-span-10 col-span-full'>
          <div className='grid md:grid-cols-7 grid-cols-1 place-items-between gap-16'>
            <div className='md:col-span-3 col-span-full h-[17rem]'>
              <img
                src='/imgs/avatar.jpg'
                alt='profile picture'
                className='object-cover w-full h-full rounded-md flex justify-center items-center'
              />
            </div>
            <div className='relative md:col-span-4 col-span-full self-stretch'>
              <div className='absolute top-0 right-0'>
                <Button cx='bg-bg-secondary'>
                  <div className='flex gap-2 justify-start items-center'>
                    <HiOutlinePencilSquare className='text-black text-xl' />
                    {
                      <span className='hidden md:block'>
                        <Text size='sm'>Edit Profile</Text>
                      </span>
                    }
                  </div>
                </Button>
              </div>
              <div className='flex flex-col w-full gap-8'>
                <div className='flex flex-col gap-3 w-full'>
                  <Text size='xl'>Jennie Yen</Text>
                  <Text size='sm'>Personnel Manager, Microsoft Corp.</Text>
                  <Text size='sm'>
                    Interested in solving the world's toughest problems. We
                    thrive on creativity, collaboration, and a healthy dose of
                    caffeine (and puns).
                  </Text>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                  <div className='flex justify-start items-center gap-3'>
                    <RiMailLine className='text-lg text-black/70' />
                    <Text size='sm' faded>
                      jennieyenatwork@micrmail.com
                    </Text>
                  </div>
                  <div className='flex justify-start items-center gap-3'>
                    <BsGlobe className='text-lg text-black/70' />
                    <Text size='sm' faded>
                      English, Spanish
                    </Text>
                  </div>
                  <div className='flex justify-start items-center gap-3'>
                    <TfiStar className='text-lg text-black/70' />
                    <Text size='sm' faded>
                      4.9 (139 reviews, 200 contracts)
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-16 mt-10 w-full'>
            <div className='flex flex-col gap-3'>
              <Text size='lg'>About</Text>
              <Text size='sm' faded copy>
                Hey there, I'm Jennie, the Personnel Manager here at Microsoft
                Corp. When I'm not building robots that can dance (seriously!),
                I'm leading our amazing team of engineers to solve the world's
                toughest problems. We thrive on creativity, collaboration, and a
                healthy dose of caffeine (and puns). If you're an engineer who
                loves tackling challenges with a smile, come join us and let's
                make magic happen!
              </Text>
            </div>
            <div className='flex flex-col gap-3'>
              <Text size='lg'>Topics</Text>
              <div className='flex flex-wrap gap-6 items-center justify-start'>
                <Button outline textBlack>
                  Electronics Engr
                </Button>
                <Button outline textBlack>
                  Software
                </Button>
                <Button outline textBlack>
                  Architecture
                </Button>
                <Button outline textBlack>
                  Wireframing
                </Button>
                <Button outline textBlack>
                  Prototype
                </Button>
                <Button outline textBlack>
                  Civil Engr
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
