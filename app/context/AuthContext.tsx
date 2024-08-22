'use client'

import { SessionProvider } from "next-auth/react"

interface AuthContextProps {
  children: React.ReactNode
}

const AuthContext: React.FC<AuthContextProps> = (props) => {
  return (
    <SessionProvider>
      {props.children}
    </SessionProvider>
  )
}

export default AuthContext
