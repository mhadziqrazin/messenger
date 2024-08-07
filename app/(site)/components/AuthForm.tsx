'use client'

import Button from "@/app/components/Button"
import Input from "@/app/components/inputs/Input"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import AuthSocialButton from "./AuthSocialButton"
import { BsGithub, BsGoogle } from "react-icons/bs"
import axios from "axios"

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER')
    else setVariant('LOGIN')
  }, [variant, setVariant])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      await axios.post('/api/register', data)
    }

    if (variant === 'LOGIN') {
      // nextauth sign in
    }

    setIsLoading(false)
  }

  const socialAction = (action: string) => {
    setIsLoading(true)

    // nextauth social sign in
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <hr className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
              disabled={isLoading}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
            </div>
            <button onClick={toggleVariant} className="underline cursor-pointer">
              {variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AuthForm
