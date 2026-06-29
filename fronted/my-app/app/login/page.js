"use client"
import React from 'react'
import { useState } from 'react'
import api from '../../servies/api'
import toast from 'react-hot-toast'
import  {useRouter} from 'next/navigation'
function Login() {
    const [login,setLogin] =useState({
        email:"",
        password:""
    })
    const route = useRouter()
    const [error,setError]=useState({})
    const handleChange = (e) =>{
setLogin({
    ...login,
    [e.target.name] :e.target.value
})
setError({})
    }

    const handleSubmit = async () =>{
        let newErrors = {};
       if(!login.email){
newErrors.email = "This Field Required"
       }else{
        const ref = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!ref.test(login.email)){
newErrors.email = "Plese valid Email"
        }
       }

       if(!login.password){
        newErrors.password = "This Field Required"
       }
       if(Object.keys(newErrors).length > 0){
        setError(newErrors)
        return
       }

       try{
          const res= await api.post('/api/auth/login',login)
          console.log(res?.data?.token)
          const token = localStorage.setItem("token",res.data.token)
          toast.success("Login Succefully")
          route.push("/dashboard")
       }catch(err){
          toast.error(err.message)
       }
    }
  return (
  <>
  <div className='bg-gay-300 flex items-center justify-center w-screen h-screen '>
    <div className='bg-white border border-gray-300  rounded-lg shadow-md p-4 w-96'>
        <h1 className='text-bold text-center font-bold mb-2'>Login</h1>
        <div className='mb-4'>
            <label>Email</label>
            <input type="email" placeholder="Please Enter Email" name="email" onChange={(e) => handleChange(e)}  className='p-2  rounded-sm border w-full border-gray-300'  />
             {error.email && <p  className='text-red-500 text-sm mt-1'>{error.email}</p>}
        </div>
         <div className='mb-4'>
            <label>Password</label>
            <input type="password" placeholder="Please Enter Password" name="password" onChange={(e) => handleChange(e)}  className='p-2  rounded-sm border w-full border-gray-300'  />
            {error.password && <p className='text-red-500 text-sm mt-1'>{error.password}</p>}
        </div>

        <button onClick={handleSubmit} className='w-full cursor-pointer bg-blue-500 text-white p-2 rounded-sm'>Login</button>
        <button
  onClick={() => route.push("/signup")}
  className="w-full mt-3 border border-blue-500 text-blue-500 p-2 rounded-sm hover:bg-blue-50 cursor-pointer"
>
  Create Account
</button>
    </div>

  </div>
  </>
  )
}

export default Login