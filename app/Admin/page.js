"use client";
import React, { use } from 'react'
import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function Admin() {
  const router = useRouter();
  const [adminForm,setAdminForm] = useState({
    username:"",
    password:"",
  })

  const handleForm = (e)=>{
   setAdminForm({
    ...adminForm,
    [e.target.name]:e.target.value,
   })
  }

  const handleAdminPage = async ()=>{

    try{
      const res = await fetch('/api/admin/login/',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(adminForm)
      })

      const fetchedData = await res.json();
      if(res.status === 200){
        console.log("Admin Login Successfull");
        toast.success("Admin Login Successfull");
        //localStorage.setItem("adminToken",fetchedData.token);
        setTimeout(() => {
          router.push('/Admin/dashboard');
        }, 3000);
       
      }
      if(res.status === 401){
        toast.warn("UnAuthorized: User");
        console.log("UnAuthorized: User");
      }
    }catch(err){
      console.log("Admin Login Failed");
      console.log(err);

    }

   

  }


  return (
  <>
  <ToastContainer position='top-center' />
  <main className=" bg-grad w-full h-full flex justify-center items-center">
  <div className=" main flex flex-col items-center h-120 w-100 bg-transparent border rounded-xl ">
    <div className='flex flex-col items-center mt-12'>
    <h2 className='text-2xl font-bold text-center'>
        ADMIN LOGIN
    </h2>
    <span className='text-center px-11 text-md'>provide admin key, username and password to Login</span>
    </div>
    <div className="form  flex flex-col items-center w-full px-4 mt-12 gap-6 ">
        <input className='w-full rounded-lg py-3 px-2 border  border-gray-400 outline-none mb-6 shadow-2xl hover:border-blue-300'
          type="text"
          name="username"
          id="username" 
          value={adminForm.username}
          onChange={handleForm}
          placeholder='Username'  
          required  />
        <input className='w-full rounded-lg py-3 px-2 border  border-gray-400 outline-none mb-4 shadow-2xl hover:border-blue-300'
          type="password"
          name="password"
          id="password" 
          value={adminForm.password}
          onChange={handleForm}
          placeholder='Password'  
          required  />

        
    </div>
    <div className="btn mt-12">
        <button type='submit' onClick={handleAdminPage} className="px-8 py-2 bg-blue-600 hover:bg-blue-800 rounded-xl text-lg">Login</button>
    </div>
  </div>
  </main>
  </>
  )
}

export default Admin
