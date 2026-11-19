function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M20.4 3.6A11.8 11.8 0 0 0 2 17.8L.7 23l5.4-1.4A11.8 11.8 0 1 0 20.4 3.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.7 14.2c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.2l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.1-.4-2.2-1.3-.8-.7-1.4-1.6-1.6-1.9-.1-.3 0-.4.2-.6l.4-.5c.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5L9 7.4c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.3 1 2.7 1.1 2.9c.2.2 2 3 4.7 4.1.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.3-.5-.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default WhatsAppIcon
