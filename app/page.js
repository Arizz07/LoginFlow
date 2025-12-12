"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast,ToastContainer } from "react-toastify";


export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [form , setForm] = useState({
      username: "",
      password:""
    });
    const router = useRouter();


  useEffect(() => {
    // wait a tick then show (gives nicer effect)
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  const handleForm = async ()=>{
    localStorage.setItem("newForm",JSON.stringify(form));
    console.log("submitted form",form);
    try{
      const data = await fetch('/api/login',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(form)
      })
      const res = await data.json();
      console.log("server res:",res);
      if(!res.success){
        console.error("Login Failed",res.message);
        return;
        
      }
      console.log("Login Successful");
    }catch(err){
      console.error("Error during login:",err);
      return;
    }
    setForm({
      username: "",
      password:""
    })
    toast.success("Login Successful");
    setTimeout(() =>{
      router.refresh();
      router.push('/dashboard');
    },3000);
    
    
  }
  return (
    <>
    <ToastContainer position="top-center"/>
    <main className="bg-[url('/images/BG.jpeg')] bg-no-repeat bg-cover  h-full w-full flex justify-center items-center">
    <div className={`flex justify-center  h-130 w-100 border bg-neutral-700/25 backdrop-blur-lg  rounded-xl shadow-2xl p-4
    order border-white/10
          transform transition-all duration-700 ease-out
          ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
        `}>
     
       <div className="text-white flex flex-col gap-8 w-120 my-8">
        <div className="head flex flex-col justify-around">
        <h2 className="text-2xl font-bold text-center">LOGIN</h2>
        <span className="text-center">Login using Username and Password</span>
        </div>      
       <div className="form-group flex flex-col gap-2  items-start pl-4" >
        <label className="text-lg " htmlFor="uname">Username:</label>
        <input className="w-80 h-10 border rounded-md  outline-none px-3 py-1 mb-4 hover:border-2 transition-all hover:border-cyan-200"
         type="text"
        name="username" 
        id="username" 
        value={form.username}
        onChange={(e) => setForm({...form, username: e.target.value})}
        required placeholder="" />

          <label className="text-lg " htmlFor="uname">Password:</label>
        <input className="w-80 h-10 border rounded-md  outline-none px-3 py-1 mb-2 hover:border-2 transition-all hover:border-cyan-200" 
        type="password" 
        name="password" 
        id="password" 
        value={form.password}
        onChange={(e) => setForm({...form, password: e.target.value})}
        required placeholder="" />
       </div>

       <div className="forgotpass flex flex-col items-center gap-1">
        <button type="submit" onClick={handleForm} className="rounded-lg px-8 text-lg py-1 shadow-md bg-blue-500 hover:bg-blue-800">Login</button>
        <span className="text-center text-blue-500 font-bold "><Link href={'/'}>Forgot Password?</Link></span>
        <span className="text-sm">Don't have an Account?<Link className="text-blue-500" href={'/signup'}>Sign Up</Link></span>
       </div>

       <div className="footer flex flex-col items-center text-gray-400 ">
        <span className="text-md">© All Rights Reserved by <b>Ariizz</b></span>
        <div className="opt text-sm flex gap-1">
          <span>About Us |</span>
          <span>License |</span>
          <span>Privacy Policy |</span>
          <span>Terms & Conditions</span>
        </div>
       </div>
        </div>
      </div>
    </main>
    </>
  );
}
