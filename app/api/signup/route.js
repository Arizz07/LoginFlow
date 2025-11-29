
import { connectDB } from "@/app/lib/connectDB";
import user from "@/app/models/user";

export async function POST(request){
    try{
        await connectDB();
        const body = await request.json();

        const existUser = await user.findOne({email:body.mail},{username:body});
        if(existUser){
            return Response.json({error:"User already Exists"},{status:400});
        }
        const newUser  = new user({
            username: body.uname,
            email: body.mail,
            password: body.password
        })
        await newUser.save();

        console.log("Received signup data:", body);
        return Response.json({message:newUser},{status:200});
    }catch(err){
        console.log("Error in signup route:", err);
        return  Respose.json({error:"Internal Server Error"},{status:500});
    }
}