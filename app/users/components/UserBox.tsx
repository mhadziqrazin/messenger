'use client'

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = (props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)

    axios.post('/api/conversations', {
      userId: props.data.id
    })
    .then(data => {
      router.push(`/conversations/${data.data.id}`)
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false))
  }, [props.data, router])
  return (
    <button
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 text-left bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <Avatar user={props.data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">
              {props.data.name}
            </p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default UserBox
