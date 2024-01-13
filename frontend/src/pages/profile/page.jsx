import { BsGlobe, BsPhone } from 'react-icons/bs'
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
  const {
    _id,
    companyName,
    industry,
    email,
    location,
    phoneNumber,
    jobPosted,
  } = profileData

  return (
    <Layout companyName={companyName}>
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
                <Button
                  cx='bg-bg-secondary'
                  disabled
                  onClick={() => navigate(`/employer/${_id}/profile/edit`)}
                >
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
                  <Text size='xl'>{companyName}</Text>
                  <Text size='sm'>{industry}</Text>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                  <div className='flex justify-start items-center gap-3'>
                    <RiMailLine className='text-lg text-black/70' />
                    <Text size='sm' faded>
                      {email}
                    </Text>
                  </div>
                  <div className='flex justify-start items-center gap-3'>
                    <BsGlobe className='text-lg text-black/70' />
                    <Text size='sm' faded>
                      {location}
                    </Text>
                  </div>
                  <div className='flex justify-start items-center gap-3'>
                    <BsPhone className='text-lg text-black/70' />
                    <Text size='sm' faded>
                      {phoneNumber}
                    </Text>
                  </div>
                  <div className='flex justify-start items-center gap-3'>
                    <TfiStar className='text-lg text-black/70' />
                    <Text size='sm' faded>
                      {jobPosted.length} contracts
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap gap-8 items-center pt-8'>
            <Button cx='bg-red-500'>
              <Text size='sm' white>
                Delete Account
              </Text>
            </Button>
            <Button cx='bg-bg-secondary' outline>
              <Text size='sm'>Log out</Text>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
