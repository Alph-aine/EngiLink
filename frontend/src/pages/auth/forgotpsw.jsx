import Button from '../../components/button'
import Input from '../../components/input'
import Text, { TextLink } from '../../components/text'

export default function ForgotPassword() {
  return (
    <div className='grid xl:grid-cols-12 lg:grid-cols-10 gap-0 min-h-screen'>
      <div className='lg:col-span-4 md:col-span-3 bg-white w-full h-full flex justify-center items-center'>
        <form
          onSubmit={() => console.log('Email submitted')}
          className='grow flex flex-col justify-between md:items-start items-center gap-5 md:p-10 p-5'
        >
          <Text size='xl'>Forgot Password</Text>
          <Text size='sm'>
            You will receive a reset token in the email you provide below
          </Text>
          <div className='flex flex-col md:gap-5 gap-2 w-full'>
            <Input type='email' name='email' placeholder='Email' />
          </div>
          <Button type='submit'>Receive Token</Button>
          <TextLink to='/signup'>Forgot email? contact us</TextLink>
        </form>
      </div>
      <div
        className={`bg-[url('/imgs/forgotpsw-pic.jpg')] bg-cover bg-no-repeat bg-right lg:col-start-5 md:col-start-4 md:col-end-13 md:block hidden`}
      />
    </div>
  )
}
