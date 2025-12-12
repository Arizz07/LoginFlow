"use client"
import Link from 'next/link';
import React from 'react'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';



function signup() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [signupForm,setSignupForm] = useState({
      username:"",
      email:"",
      password:""
    })

    useEffect(() => {

       console.log("use effect called");

    const savedData =  localStorage.getItem("signupData");
  
      setSignupForm({
        username:"",
        email:"",
        password:""
      })


    // wait a tick then show (gives nicer effect)
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
   

  }, []);

  const handleChange = (e)=>{
    setSignupForm({
      ...signupForm,[e.target.name]:e.target.value
    })
  }

  const formSubmit = async (e)=>{
    e.preventDefault();
    console.log(signupForm);
    if(!signupForm.username || !signupForm.email || !signupForm.password){
      toast.error("Please fill all the fields");
      return;
    }

     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
     if (!passwordRegex.test(signupForm.password)) {
      toast.error(
        "Password must contain at least 1 uppercase, 1 number, 1 special character, and be 8+ characters long 🔒",
        { position: "top-right", autoClose: 4000, theme: "dark" }
      );
      return;
    }
    try{
      const res = await fetch('api/signup',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(signupForm)
      })

      const data = await res.json();
      if(!res.ok){
        toast.error(data.error || "Signup failed");
        return; 
      }
      console.log("server res:",data);
     
      toast.success("Signup Successful!");
      setTimeout(()=>{
        router.push('/');
      },3000)
      
    }catch(err){
      console.log("error in signup form submit:",err);
    }
    localStorage.setItem("signupData",JSON.stringify(signupForm));
    console.log("signup form submitted");

    setSignupForm({
      username:"",
      email:"",
      password:""
    })  
  }

  return (
   <>
   <ToastContainer position='top-center'/>
   <main className="bg-[url('/images/BG.jpeg')] bg-no-repeat bg-cover backdrop-blur-3xl opacity-98  h-full w-full flex justify-center items-center">
    <div className={`flex flex-col items-center   h-130 w-100 border bg-green-600/5 backdrop-blur-lg  rounded-xl shadow-2xl p-4
    order border-white/10
          transform transition-all duration-700 ease-out
          ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
        `}>
           <div className="head flex flex-col items-center mt-6 ">
            <h2 className='text-3xl font-bold'>SIGNUP</h2>
            <span>provide your details to create an account</span>
            <span className='text-sm'>Already have an Account? <Link className='text-blue-500' href={'/'}>Login</Link></span>
           </div>
           <div className="input-group flex - flex-col gap-8   mt-16 w-full">
            <input className='w-full h-12 px-2 py-2 border-b outline-none duration-300 transition-all hover:border-2 hover:border-green-300 hover:rounded-lg mb-2 shadow-md'
            value={signupForm.username}
            onChange={handleChange}
             type="text" name="username" id="username"  placeholder='Username:'
             required/>
            <input className='w-full h-12 px-2 py-2 border-b outline-none duration-300 transition-all hover:border-2 hover:border-green-300 hover:rounded-lg mb-2 shadow-md'
            value={signupForm.email}
            onChange={handleChange}
             type="email" name='email' id='email' placeholder='Email:'
             required />
            <input className='w-full h-12 px-2 py-2 border-b outline-none duration-300 transition-all hover:border-2 hover:border-green-300 hover:rounded-lg mb-2 shadow-md'
            value={signupForm.password}
            onChange={handleChange}
             type="password" name="password" id="password" placeholder='Password:' 
             required/>
           </div>
           <div className="buttons">
            <button type='submit' onClick={formSubmit} className="px-8 py-2 rounded-lg shadow-lg bg-green-600 mt-4 text-xl">Signup</button>
           </div>
           <div className="copyright mt-3">
            <span className='text-neutral-300'>© All Rights Reserved by <b>Ariizz🤍</b></span>
           </div>
    </div>
   </main>
   </>
  )
}

export default signup
