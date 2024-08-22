import clsx from "clsx"
import Link from "next/link"

interface MobileItemProps {
  href: string
  icon: any
  active?: boolean
  onClick?: () => void
}

const MobileItem: React.FC<MobileItemProps> = (props) => {
  const handleClick = () => {
    if (props.onClick) return props.onClick()
  }

  return (
    <Link
      onClick={props.onClick}
      href={props.href}
      className={clsx(
        "group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100",
        props.active && "bg-gray-100 text-black"
      )}
    >
      <props.icon className="h-6 w-6" />
    </Link>
  )
}

export default MobileItem
