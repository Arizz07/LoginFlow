import { signToken } from '@/app/lib/auth';
import {connectDB} from '@/app/lib/connectDB';
import  user from '@/app/models/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try{
        await connectDB();
        console.log("db connected");

        const body = await request.json();
        const {username,password} = body;
       const foundUser = await user.findOne({username:username});
       console.log(foundUser);
       if(!foundUser){
        return NextResponse.json({success:false,message:"User not found"}, {status:404});

       }
       const isMatch = await bcrypt.compare(password, foundUser.password);
       if(!isMatch){
        return NextResponse.json({message:"Password Doesn't match"}, {status:401});
       }

       const payLoad = {
        id: foundUser._id,
        username:foundUser.username,
        role:foundUser.role,
       }

       const token  = signToken(payLoad);

         const res =  NextResponse.json({success:true,message:"Login Successful",user:foundUser}, {status:200});

         res.cookies.set("session",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge:24*60*60,
            path:"/",
         })
            return res;

    
        
    }catch(err){
        console.error("Error in login route:",err);
       return Response.json({success:false,message:"Internal Server Error"}, {status:500});
    }
}