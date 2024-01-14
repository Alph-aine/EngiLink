import Text from './text'

export default function Button({
  children,
  onClick,
  cx,
  type = 'button',
  disabled = false,
  outline = false,
  textBlack = false,
}) {
  const bg = cx ? cx : 'bg-primary'
  const disabledBg = disabled
    ? cx !== undefined
      ? `${cx}/30`
      : 'bg-primary/30'
    : bg
  const isOutline = outline ? 'bg-transparent border border-bg-primary' : bg

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${isOutline} shrink-0 rounded-lg md:px-4 px-3 md:py-3 py-2  ${disabledBg} disabled:cursor-not-allowed`}
      onClick={onClick}
    >
      {typeof children === 'string' ? (
        <Text size='sm' white={!textBlack}>
          {children}
        </Text>
      ) : (
        children
      )}
    </button>
  )
}
