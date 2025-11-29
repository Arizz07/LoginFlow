import {connectDB} from '@/app/lib/connectDB';
import  user from '@/app/models/user';

export async function POST(request) {
    try{
        await connectDB();
        console.log("db connected");

        const body = await request.json();
        console.log("Request body:", body);
       const foundUser = await user.findOne({username:body.uname,password:body.pass});
       console.log(foundUser);
       if(!foundUser){
        return Response.json({success:false,message:"User not found"}, {status:404});

       }
         return Response.json({success:true,message:"Login Successful",user:foundUser}, {status:200});
    
        
    }catch(err){
        console.error("Error in login route:",err);
       return Response.json({success:false,message:"Internal Server Error"}, {status:500});
    }
}