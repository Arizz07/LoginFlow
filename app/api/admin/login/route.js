import {connectDB} from '@/app/lib/connectDB';
import Admin from '@/app/models/Admin';
import { NextResponse } from 'next/server';
import { signToken } from '@/app/lib/auth';
import bcrypt from 'bcryptjs';


export async function POST(request) {
    await connectDB();

    const { username, password } = await request.json();
   

    try{
       const AdminUser = await Admin.findOne({username:username,password:password});
       if(!AdminUser){
        return NextResponse.json({message:"UnAuthorized User"},{status:401});
       }

       const payLoad = {
        id: AdminUser._id,
        username: AdminUser.username,
        role: "admin",
       }

       const token = signToken(payLoad);


       const res =  NextResponse.json({message:"Admin Login Successful",AdminUser},{status:200});

       res.cookies.set("session",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge:24*60*60,
        path:"/",
       })
         return res;
    }catch(err){
        console.log("Error in Admin Login Route");
        console.log(err);
        return NextResponse.json({message:"Internal Server Error"},{status:500});
    }
    
}