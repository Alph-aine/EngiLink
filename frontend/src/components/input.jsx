export default function Input({
  type,
  minLength,
  id,
  name,
  placeholder,
  value,
  onChange,
  required=false,
  defaultValue,
}) {
  return (
    <input
      id={id}
      type={type}
      minLength={minLength}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      defaultValue={defaultValue}
      className='block w-full px-4 py-2 md:text-base text-sm border border-primary/40 rounded-lg focus:outline-none focus:border-2 focus:border-primary'
    />
  )
}
