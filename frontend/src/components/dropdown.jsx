import { createContext, useContext, useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { PiCaretDownThin } from 'react-icons/pi'
import Button from './button'
import Text from './text'

const DropContext = createContext({
  active: '',
  setActive: () => {
    return
  },
  setIsOpen: () => {
    return
  },
})

const useDrop = () => useContext(DropContext)

export default function DropDown({ title, initialActive, children }) {
  const [active, setActive] = useState(initialActive)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropContext.Provider
      value={{
        active,
        setActive: (value) => setActive(value),
        setIsOpen: (value) => setIsOpen(value),
      }}
    >
      {isOpen && (
        <div
          className='fixed inset-0 bg-transparent'
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className='relative w-full' aria-haspopup='menu'>
        <div
          className='w-full border border-bg-primary rounded-md p-5'
          onClick={() => setIsOpen((prev) => !prev)}
          outline
        >
          <span className='flex justify-between items-center gap-4 uppercase'>
            <Text size='sm'>{title}</Text>
            <PiCaretDownThin className='text-xl shrink-0' />
          </span>
        </div>
        <div
          className={`absolute top-[100%] inset-x-0 ${
            isOpen ? 'flex' : 'hidden'
          } flex-col items-stretch`}
        >
          {children}
        </div>
      </div>
    </DropContext.Provider>
  )
}

export function DropItem({ value, onClick, children }) {
  const { active, setActive, setIsOpen } = useDrop()
  const isActive = active === value

  const outlineStyles = `${
    isActive ? 'bg-primary text-white' : 'bg-white text-black/90'
  }`

  return (
    <button
      className={`py-4 md:px-10 px-3 shadow-md border border-primary leading-none text-base font-medium ${outlineStyles}`}
      onClick={() => {
        setActive(value)
        onClick()
        setIsOpen(false)
      }}
    >
      <span className='flex justify-center items-center gap-4'>
        <Text size='sm' white={isActive}>
          {children}
        </Text>
        <BsCheckLg className='text-4xl text-white shrink-0' />
      </span>
    </button>
  )
}
