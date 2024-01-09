export default function Input({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='block w-full px-4 py-2 md:text-base text-sm border border-primary/40 rounded-lg focus:outline-none focus:border-2 focus:border-primary'
    />
  )
}
