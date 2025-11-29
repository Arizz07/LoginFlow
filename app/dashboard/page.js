import React from 'react'

function dashboard() {
  return (
  <>
   <main className=" bg-grad w-full h-full flex flex-col items-center pt-4">
    <h2 className='text-center text-5xl font-bold pt-40'>Welcome To Home</h2>
    <span>  This is a simple page where you're Logged in</span>
    <div className="buttons flex gap-4 mt-4">
      <button className="bg-blue-500 w-30 rounded-lg shadow-2xl px-2 py-2 font-bold">
        Get Started
      </button>
       <button className="bg-red-500 w-30 rounded-lg px-2 py-2 font-bold shadow-2xl">
        Logout
      </button>

    </div>
   </main>
  </>
  )
}

export default dashboard
