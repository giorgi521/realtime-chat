'use client'

import { FC, useState } from 'react'
import Button from './ui/Button'
import { addFreindValidator } from '@/lib/validations/add-friend'
import axios, { AxiosError } from 'axios'
import {z} from 'zod'
import { set, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'



type FormData = z.infer<typeof addFreindValidator>

const AddFriendButton= ({}) => {

   const [showSucces,setShowSucces] = useState(false)

   const  {
         register,
         handleSubmit,
         setError,
         formState: { errors }
   } = useForm<FormData>({
    resolver: zodResolver(addFreindValidator)
   })
    

    const addFreind = async (email:string) => {
        try
        {
           const validateEmail = addFreindValidator.parse({ email })
           
           axios.post('/api/friends/add', { email: validateEmail })
           setShowSucces(true)
        }
        catch (error){
            if(error instanceof z.ZodError){
                setError('email', {message: error.message})
                return 
            }

            if(error instanceof AxiosError){
                setError('email', {message: error.response?.data.message})
                console.log(error)
            }
            setError('email', {message: 'something went wrong'})
        }

}

const onSubmit = (data: FormData) => {
    addFreind(data.email)
}


  return <form
    onSubmit={handleSubmit(onSubmit)}
   className='max-w-sm'
  >
    <label
     htmlFor="email"
     className='block text-sm font-medium text-gray-900 leading-6'
     >
      Add Friend by Email
    </label>

    <div className='mt-2 flex gap-4'>
        <input type="text" className='block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-insert ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-isert focus:ring-indigo-600  sm:text-sm sm:leading-6'
        placeholder='your@example.com'
        {...register('email')}
        />
        <Button>add</Button>
    </div>

    <p className='mt-1 text-sm text-red-600'>{errors.email?.message}</p>
    {showSucces && <p className='mt-1 text-sm text-green-600'>Friend added</p>}
  </form>
}
export default AddFriendButton;