import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Input from '../../components/input'
import Text, { TextLink } from '../../components/text'
import Vetpass from '../../components/vetpass'
import useVetPsw from '../../hooks/usevetpsw'
import Button from '../../components/button'
import Notification from '../../components/notification'
import useNotification from '../../hooks/usenotification'
import { formDataToJSON } from '../../lib/utils'

export default function SignUp() {
  const navigate = useNavigate()
  const [params, setSearchParams] = useSearchParams()
  const { notifications, removeNotif, addNotif } = useNotification(
    params.get('msg'),
    params.get('msgType')
  )
  const [password, setPassword] = useState('')
  const { has8chars, has1num, has1spec } = useMemo(
    () => useVetPsw(password),
    [password]
  )

  const allowSubmit = useMemo(() => {
    return !has1num || !has8chars || !has1spec
  }, [has1num, has8chars, has1spec])

  const submit = (e) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    form.append('password', password)

    const jsonData = formDataToJSON(form)

    axios
      .post('https://engilink.vercel.app:3000/api/v1/employer/register/', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => navigate(`/employer/auth/signin`))
      .catch((e) => {
        addNotif({
          message: e.response.data.message ?? e.response.statusText,
          signal: 'BAD',
        })
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
          <Text size='xl'>Create an account</Text>
          <div className='flex justify-start items-center gap-2'>
            <Text size='sm'>Already have an account?</Text>
            <TextLink to='/employer/auth/signin'>Sign In</TextLink>
          </div>
          <div className='flex flex-col md:gap-5 gap-2 w-full'>
            <Input type='email' name='email' placeholder='Email' required />
            <Input
              type='phone'
              name='phoneNumber'
              placeholder='Phone'
              required
            />
            <Input type='text' name='location' placeholder='Address' required />
            <Input
              type='company'
              name='companyName'
              placeholder='Company Name'
              required
            />
            <Input
              type='industry'
              name='industry'
              placeholder='Industry'
              required
            />
            <Input
              type='password'
              minLength='8'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Vetpass
              has8chars={has8chars}
              has1num={has1num}
              has1spec={has1spec}
            />
          </div>
          <Button type='submit' disabled={allowSubmit} cx='bg-primary w-full'>
            Sign Up
          </Button>
        </form>
      </div>
      <div
        className={`bg-[url('/imgs/register-pic.jpg')] bg-cover bg-no-repeat lg:col-start-5 md:col-start-4 md:col-end-13 md:block hidden`}
      />
    </div>
  )
}
