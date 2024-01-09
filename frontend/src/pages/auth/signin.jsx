import { useState } from 'react'
import axios from 'axios'
import Input from '../../components/input'
import Text, { TextLink } from '../../components/text'
import Button from '../../components/button'

export default function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const setEmail = (email) => setForm((prev) => ({ ...prev, email }))
  const setPsw = (password) => setForm((prev) => ({ ...prev, password }))

  const submit = () => {
    axios
      .post('http://localhost:5000/api/v1/employer/login/', form)
      .then((response) => console.log('New login date:', response.data))
      .catch((error) => console.error(error))
  }

  return (
    <div className='grid xl:grid-cols-12 lg:grid-cols-10 gap-0 min-h-screen'>
      <div className='lg:col-span-4 md:col-span-3 bg-white w-full h-full flex justify-center items-center'>
        <div className='grow flex flex-col justify-between md:items-start items-center gap-5 md:p-10 p-5'>
          <Text size='xl'>Sign in</Text>
          <div className='flex justify-start gap-2'>
            <Text size='sm'>Don&apos;t have an account?</Text>
            <TextLink to='/signup'>Create an account</TextLink>
          </div>
          <div className='flex flex-col md:gap-5 gap-2 w-full'>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='password'
              name='password'
              placeholder='Password'
              onChange={(e) => setPsw(e.target.value)}
            />
          </div>
          <Button onClick={submit}>Sign In</Button>
          <TextLink to='/signup'>Forgot password?</TextLink>
        </div>
      </div>
      <div
        className={`bg-[url('/imgs/login-pic.jpg')] bg-cover bg-no-repeat bg-right lg:col-start-5 md:col-start-4 md:col-end-13 md:block hidden`}
      />
    </div>
  )
}
