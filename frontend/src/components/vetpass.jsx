import { BsCheckLg } from 'react-icons/bs'
import Text from './text'

export default function Vetpass({
  has8chars = false,
  has1num = false,
  has1spec = false,
}) {
  return (
    <div className='flex flex-col justify-center items-start gap-2 w-full'>
      <div className='flex justify-start items-center gap-2'>
        <BsCheckLg
          className={`${
            has8chars ? 'text-primary' : 'text-bg-primary/20'
          } text-xl`}
        />
        <Text size='xs'>At least 8 characters</Text>
      </div>
      <div className='flex justify-start items-center gap-2'>
        <BsCheckLg
          className={`${
            has1num ? 'text-primary' : 'text-bg-primary/20'
          } text-xl`}
        />
        <Text size='xs'>At least one number</Text>
      </div>
      <div className='flex justify-start items-center gap-2'>
        <BsCheckLg
          className={`${
            has1spec ? 'text-primary' : 'text-bg-primary/20'
          } text-xl`}
        />
        <Text size='xs'>At least one special character</Text>
      </div>
    </div>
  )
}
