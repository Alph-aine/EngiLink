import { useMemo, useState } from 'react'
import axios from 'axios'
import Input from '../../components/input'
import Text, { TextLink } from '../../components/text'
import Vetpass from '../../components/vetpass'
import useVetPsw from '../../hooks/usevetpsw'
import Button from '../../components/button'

export default function SignUp() {
  const [form, setForm] = useState({
    email: '',
    phone: '',
    address: '',
    industry: '',
    company: '',
    password: '',
  })
  const { has8chars, has1num, has1spec } = useMemo(
    () => useVetPsw(form.password),
    [form.password]
  )
  const setEmail = (email) => setForm((prev) => ({ ...prev, email }))
  const setPhone = (phone) => setForm((prev) => ({ ...prev, phone }))
  const setAddress = (address) => setForm((prev) => ({ ...prev, address }))
  const setIndustry = (industry) => setForm((prev) => ({ ...prev, industry }))
  const setCompany = (company) => setForm((prev) => ({ ...prev, company }))
  const setPsw = (password) => setForm((prev) => ({ ...prev, password }))

  const submit = () => {
    axios
      .post('http://localhost:5000/api/v1/employer/register/', form)
      .then((response) => console.log('Data created:', response.data))
      .catch((error) => console.error(error))
  }

  return (
    <div className='grid xl:grid-cols-12 lg:grid-cols-10 gap-0 min-h-screen'>
      <div className='lg:col-span-4 md:col-span-3 bg-white w-full h-full flex justify-center items-center'>
        <div className='grow flex flex-col justify-between md:items-start items-center gap-5 md:p-10 p-5'>
          <Text size='xl'>Create an account</Text>
          <div className='flex justify-start gap-2'>
            <Text size='sm'>Already have an account?</Text>
            <TextLink to='/signin'>Sign In</TextLink>
          </div>
          <div className='flex flex-col md:gap-5 gap-2 w-full'>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='phone'
              name='phone'
              placeholder='Phone'
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              type='address'
              name='address'
              placeholder='Address'
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              type='company'
              name='company'
              placeholder='Company Name'
              onChange={(e) => setCompany(e.target.value)}
            />
            <Input
              type='industry'
              name='industry'
              placeholder='Industry'
              onChange={(e) => setIndustry(e.target.value)}
            />
            <Input
              type='password'
              name='password'
              placeholder='Password'
              onChange={(e) => setPsw(e.target.value)}
            />
            <Vetpass
              has8chars={has8chars}
              has1num={has1num}
              has1spec={has1spec}
            />
          </div>
          <Button onClick={submit}>Sign Up</Button>
        </div>
      </div>
      <div
        className={`bg-[url('/imgs/register-pic.jpg')] bg-cover bg-no-repeat lg:col-start-5 md:col-start-4 md:col-end-13 md:block hidden`}
      />
    </div>
  )
}
