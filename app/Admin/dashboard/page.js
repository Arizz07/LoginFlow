"use client"
import React,{useState,useEffect, use} from 'react'
import { useRouter } from 'next/navigation';
import { FaCircleMinus } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [admin , setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(()=>{
    //check if admin is logged in
    const checkAdmin = async ()=>{
      try{
        const res = await fetch('/api/me',{
          method:'GET',
        });

        if(!res.ok){
          toast.error('Unauthorized Access. Please log in as Admin.');
          setTimeout(()=>{
            router.push('/Admin/');
          },2000)
       
        }

        const data = await res.json();
        if(data.user.role !== 'admin'){
          toast.error('Access Denied. Admins Only');
          setTimeout(()=>{
            router.push('/');
          },2000)
          
        }
        setAdmin(data.user);
        setLoading(false);
      }
      catch(error){
        console.error('Error checking admin authentication:', error);
        }
      }
      checkAdmin();


    //fetch users list
    const fetchUsers = async () => {
      try{
        const response = await fetch('/api/admin/usersList');
        const data = await response.json();
        const usersData = data.users || [];
        setUsers(usersData);
        console.log("Fetched users data:", users);
      }
      catch(error){
        console.error('Error fetching users:', error);
      }
    };

    

    fetchUsers();
    console.log("Users data:", users);
  },[router])

  
  if(loading){
    return <div >Loading...</div>;
  }
  const handleLogout = async () => {
    try{
      const res = await fetch('/api/admin/logout',{
        method:"POST",
      });
      if(res.ok){
        toast.success('Logged out successfully');
         setTimeout(() => {
      
      router.push('/Admin');
    }, 2000);
      }else{
        toast.error('Failed to log out');
      }
    }catch(err){
      console.error('Error logging out:', err);
    }
   
  }

  const RemoveUser = async (id)=>{
   
    try{
    const removeUser = await fetch(`/api/admin/removeUser/${id}`,{
        method:'DELETE',
       
      })
      if(removeUser.ok){
        console.log('User removed successfully');
        setUsers(users.filter((user) => user._id !== id));
      }else{
        console.error('Failed to remove user');
      }
    }
    catch(error){
      console.error('Error removing user:', error);
    }
  }

  return (
    <>
    

     <main className=" bg-grad1 w-full h-full flex flex-col  pt-4">
        <div className="logout flex justify-end items-center px-4 h-16 ">
          <button type='submit' onClick={handleLogout} className=' h-10 bg-transparent shadow-xl border hover:border-red-700 hover:border-2  hover:transition-all hover:duration-200
           hover:bg-red-600 font-bold text-black rounded-lg py-2 px-4'>Logout</button>
        </div>
       <div className="header felx justify-center items-center mt-30">
        <h2 className='text-5xl text-shadow-md font-bold text-neutral-700 text-center'>Welcome Admin {admin.username}</h2>
       </div>
       <div className="list flex flex-col px-4 py-8">
        <h2 className='text-2xl font-semibold text-neutral-600 mx-6'>List of Users</h2>
        <table className='text-black mx-4'>
          <tbody>
          <tr className='border-b-2 border-gray-500'>
            <th className='px-4 py-2 text-left'>Username</th>
            <th className='px-4 py-2 text-left'>Email</th>
            <th className='px-4 py-2 text-left'>Status</th>
            <th className='px-2 py-2 text-left '> Action</th>
          </tr>
           { users.map((user) =>(
          <tr key={user._id} className='border-b-2 border-gray-500'>
            
          
              
            <td className='px-4 py-2'>{user.username}</td>
            <td className='px-4 py-2'>{user.email}</td>
            <td className='px-4 py-2'>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td className=" py-2">
          
            
              <button type='submit' onClick={()=>RemoveUser(user._id)} className=" flex justify-center items-center gap-3 rounded-lg px-2 py-2 bg-red-400">
                <span className='text-white text-sm'>Remove</span>
                <FaCircleMinus className='text-white ' size={20}/>
              </button></td>
              
          </tr>
           ))
        }
          
          </tbody>
         
        </table>
       </div>
     </main>
    </>
  )
}

export default AdminDashboard
