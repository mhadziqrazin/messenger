import clsx from "clsx"
import { IconType } from "react-icons"

interface AuthSocialButtonprops extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType
}

const AuthSocialButton: React.FC<AuthSocialButtonprops> = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className={clsx(
        "inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0",
        props.disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <props.icon />
    </button>
  )
}

export default AuthSocialButton
