import { useState } from 'react'
import Button from '../../components/button'
import Input from '../../components/input'
import Text, { TextLink } from '../../components/text'
import useNotification from '../../hooks/usenotification'
import { formToJSON } from 'axios'

export default function ForgotPassword() {
  const { notifications, removeNotif, addNotif } = useNotification()

  const submit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const jsonData = formToJSON(formData)

    axios
      .post('https://engilink.onrender.com/api/v1/employer/password/forgot', jsonData, {
        withCredentials: true,
      })
      .then(() => navigate(`/employer/auth/signin`))
      .catch((e) => {
        addNotif({ message: e.response.data.message, signal: 'BAD' })
      })
  }

  return (
    <div className='grid xl:grid-cols-12 lg:grid-cols-10 gap-0 min-h-screen'>
      <div className='lg:col-span-4 md:col-span-3 bg-white w-full h-full flex justify-center items-center'>
        <Notification notifications={notifications} remove={removeNotif} />
        <form
          onSubmit={submit}
          className='grow flex flex-col justify-between md:items-start items-center gap-5 md:p-10 p-5 text-center'
        >
          <Text size='xl'>Forgot Password</Text>
          <Text size='sm'>
            You will receive a reset token in the email you provide below
          </Text>
          <div className='flex flex-col md:gap-5 gap-2 w-full'>
            <Input type='email' name='email' placeholder='Email' required />
          </div>
          <Button cx='bg-primary w-full' type='submit'>
            Receive Token
          </Button>
          <TextLink to='/contact'>Forgot email?</TextLink>
        </form>
      </div>
      <div
        className={`bg-[url('/imgs/forgotpsw-pic.jpg')] bg-cover bg-no-repeat bg-right lg:col-start-5 md:col-start-4 md:col-end-13 md:block hidden`}
      />
    </div>
  )
}
