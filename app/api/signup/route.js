import bcrypt from 'bcryptjs';
import { connectDB } from "@/app/lib/connectDB";
import user from "@/app/models/user";

export async function POST(request){
    try{
        await connectDB();
        const body = await request.json();
        const {username,email,password} = body;
       

       const existUser = await user.findOne({username:username})
        if(existUser){
            return Response.json({error:"User already Exists"},{status:400});
        }
        const hashedPass = await bcrypt.hash(password,10);
        


        const newUser  = new user({
           username:username,
           email:email,
           password:hashedPass
        })
        await newUser.save();

        return Response.json({message:newUser},{status:200});
    }catch(err){
        console.log("Error in signup route:", err);
        return  Response.json({error:"Internal Server Error"},{status:500});
    }
}