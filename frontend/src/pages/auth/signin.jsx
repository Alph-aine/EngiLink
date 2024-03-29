import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Input from '../../components/input'
import Text, { TextLink } from '../../components/text'
import Button from '../../components/button'
import Notification from '../../components/notification'
import useNotification from '../../hooks/usenotification'
import { formDataToJSON } from '../../lib/utils'

export default function SignIn() {
  const navigate = useNavigate()
  const [params, setSearchParams] = useSearchParams()
  const { notifications, removeNotif, addNotif } = useNotification(
    params.get('msg'),
    params.get('msgType')
  )

  const submit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const jsonData = formDataToJSON(formData)

    axios
      .post('https://engilink.onrender.com/api/v1/employer/login/', jsonData, {
        withCredentials: true,
      })
      .then((response) => {
        const employerId = response.data?.user._id
        navigate(`/employer/${employerId}/profile`)
      })
      .catch((e) => {
        setSearchParams({ msg: e.response.data.message, msgType: 'BAD' })
      })
  }

  return (
    <div className='grid xl:grid-cols-12 lg:grid-cols-10 gap-0 min-h-screen'>
      <div className='relative lg:col-span-4 md:col-span-3 bg-white w-full h-full flex justify-center items-center'>
        <Notification notifications={notifications} remove={removeNotif} />
        <form
          onSubmit={submit}
          className='grow flex flex-col justify-between md:items-start items-center gap-5 md:p-10 p-5'
        >
          <Text size='xl'>Sign in</Text>
          <div className='flex justify-start items-center gap-2'>
            <Text size='sm'>Don&apos;t have an account?</Text>
            <TextLink to='/employer/auth/signup'>Create an account</TextLink>
          </div>
          <div className='flex flex-col md:gap-5 gap-2 w-full'>
            <Input type='email' name='email' placeholder='Email' required />
            <Input
              type='password'
              name='password'
              placeholder='Password'
              required
            />
          </div>
          <Button cx='bg-primary w-full' type='submit'>
            Sign In
          </Button>
          <TextLink to='/employer/auth/forgotpassword'>
            Forgot password?
          </TextLink>
        </form>
      </div>
      <div
        className={`bg-[url('/imgs/login-pic.jpg')] bg-cover bg-no-repeat bg-right lg:col-start-5 md:col-start-4 md:col-end-13 md:block hidden`}
      />
    </div>
  )
}
