import Text from '../../components/text'
import Button from '../../components/button'
import Input from '../../components/input'
import Layout from '../../components/layout'

export default function EditProfile({ defaultProfile }) {
  return (
    <Layout>
      <div className='flex flex-col gap-10 w-full'>
        <Text size='xl'>Edit Profile Page</Text>
        <form className='grid md:grid-cols-7 grid-cols-1 place-items-stretch md:gap-20 gap-10'>
          <div className='md:col-span-3 grid-cols-full flex flex-col gap-3'>
            <div className='h-[15rem] w-full group'>
              <div
                onSubmit={() => console.log('Form submitted')}
                className='flex justify-center items-center border border-bg-primary rounded-md w-full h-full'
              >
                <div className='px-2 py-3 bg-secondary rounded-md'>
                  <Text size='md'>Profile Picture</Text>
                </div>
              </div>
            </div>
            <label htmlFor='pic' className='flex flex-col w-full gap-2'>
              <Text size='sm'>Profile Picture</Text>
              <Input
                id='pic'
                type='file'
                name='pic'
                placeholder='Upload a picture'
              />
            </label>
          </div>
          <div className='md:col-span-4 col-span-full'>
            <div className='flex flex-col md:gap-5 gap-2 w-full'>
              <div className='flex flex-col md:flex-row gap-2'>
                <label htmlFor='fname' className='flex flex-col gap-1'>
                  <text size='sm'>First Name</text>
                  <Input
                    id='fname'
                    type='text'
                    name='firstname'
                    placeholder='First Name'
                  />
                </label>
                <label htmlFor='lname' className='flex flex-col gap-1'>
                  <text size='sm'>Last Name</text>
                  <Input
                    id='lname'
                    type='text'
                    name='lasttname'
                    placeholder='Last Name'
                  />
                </label>
              </div>
              <label htmlFor='bio' className='flex flex-col gap-1'>
                <Text size='sm'>Bio</Text>
                <textarea
                  id='bio'
                  name='bio'
                  className='block w-full px-4 py-2 md:text-base text-sm border border-bg-primary/40 rounded-lg focus:outline-none focus:border-2 focus:border-bg-primary'
                  rows={3}
                  placeholder='bio'
                />
              </label>
              <label htmlFor='email' className='flex flex-col gap-1'>
                <Text size='sm'>Email</Text>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='Email'
                />
              </label>
              <label htmlFor='companyname' className='flex flex-col gap-1'>
                <Text size='sm'>Company Name</Text>
                <Input
                  id='companyname'
                  name='companyname'
                  type='text'
                  placeholder='Company Name'
                />
              </label>
            </div>
          </div>
        </form>
        <Button cx='bg-primary md:w-fit w-full mx-auto'>Update Profile</Button>
      </div>
    </Layout>
  )
}
