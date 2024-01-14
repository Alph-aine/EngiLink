export default function Text({
  size,
  children,
  primary = false,
  white = false,
  faded = false,
  copy = false,
  clamp = false,
}) {
  const sizeStyles = `${size === 'xl' && 'md:text-4xl text-3xl'} ${
    size === 'lg' && 'md:text-2xl text-xl'
  } ${size === 'md' && 'md:text-xl text-lg'} ${
    size === 'sm' && 'md:text-base text-sm'
  } ${size === 'xs' && 'text-xs'}`

  const isCopy = `${copy ? 'leading-snug' : 'leading-none'}`
  const isPrimary = `${primary ? 'text-primary' : 'text-black'}`
  const isWhite = `${white ? 'text-white' : isPrimary}`
  const isFaded = faded ? `text-black/70` : isWhite
  const isClamp = clamp ? 'line-clamp-2' : ''

  return (
    <p
      className={`inline ${isCopy} ${isFaded} ${sizeStyles} ${isClamp} font-medium`}
    >
      {children}
    </p>
  )
}

export function TextLink({ to, className, children, white = false }) {
  return (
    <a
      href={to}
      className={`underline decoration-from-font underline-offset-4 decoration-primary ${className}`}
    >
      <Text size='sm' primary white={white}>
        {children}
      </Text>
    </a>
  )
}
