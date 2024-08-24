import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface MessageInputProps {
  id: string
  placeholder?: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = (props) => {
  return (
    <div className="relative w-full">
      <input
        id={props.id}
        type={props.type}
        autoComplete={props.id}
        placeholder={props.placeholder}
        {...props.register(props.id, { required: props.required })}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  )
}

export default MessageInput
