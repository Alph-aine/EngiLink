import Button from '../../components/button'
import Input from '../../components/input'
import Text, { TextLink } from '../../components/text'

export default function UpdatePassword() {
  const { notifications, removeNotif, addNotif } = useNotification()

  const submit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const jsonData = formToJSON(formData)

    axios
      .put('http://localhost:3000/api/v1/employer/password/update', jsonData, {
        withCredentials: true,
      })
      .then(() => navigate(`/employer/auth/signin`))
      .catch((e) => {
        addNotif({ message: e.response.data.message, signal: 'BAD' })
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
          <Text size='xl'>Update Password</Text>
          <Text size='sm'>Make your password to a new and strong</Text>
          <div className='flex flex-col md:gap-5 gap-2 w-full'>
            <Input type='email' name='email' placeholder='Email' />
            <Input
              type='password'
              name='oldPassword'
              placeholder='Old Password'
              required
            />
            <Input
              type='password'
              name='newPassword'
              placeholder='New Password'
              required
            />
          </div>
          <Button cx='bg-primary w-full' type='submit'>
            Receive Password
          </Button>
          <TextLink to='/contact'>Forgot email</TextLink>
        </form>
      </div>
      <div
        className={`bg-[url('/imgs/forgotpsw-pic.jpg')] bg-cover bg-no-repeat bg-right lg:col-start-5 md:col-start-4 md:col-end-13 md:block hidden`}
      />
    </div>
  )
}
