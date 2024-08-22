import clsx from "clsx"
import Link from "next/link"

interface DesktopItemProps {
  label: string
  icon: any
  href: string
  onClick?: () => void
  active?: boolean
}

const DesktopItem: React.FC<DesktopItemProps> = (props) => {
  const handleClick = () => {
    if (props.onClick) return props.onClick()
  }

  return (
    <li onClick={handleClick}>
      <Link
        href={props.href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100",
          props.active && "text-black bg-gray-100"
        )}
      >
        <props.icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{props.label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem
