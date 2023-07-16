'use client'

import GoogleIcon from '@/components/svg/Google'
import Button from '@/components/ui/Button'
import { FC, useState } from 'react'
import {signIn} from 'next-auth/react'
import { toast } from 'react-hot-toast'
interface pageProps {
}

const Login: FC<pageProps> = ({}) => {
    const [isloading, setIsLoading ]= useState(false)

    const loginWidthGoogle = async () => {
        setIsLoading(true)
        try
        {
            await signIn('google')
        }
        catch (error)
        {
           toast.error('something went wrong')
        }
        finally{
            setIsLoading(false)
        }
    }
    

  return <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg-px-8'>
            <div className='flex w-full flex-col items-center max-w-md space-y-8'>
               <div className='flex flex-col items-center gap-8'>
                   logo
                     <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                        Sign in to your account
                    </h2>
               </div>
               <Button
                 isloading = {isloading}        
                 type='button'
                 className='max-w-sm mx-auto w-full'
                 onClick={loginWidthGoogle}
               >
                    <div className='flex'>
                      {isloading ? null : <GoogleIcon />}
                      <div>Google</div> 
                    </div>
               </Button>
            </div>
         </div>
}

export default Login