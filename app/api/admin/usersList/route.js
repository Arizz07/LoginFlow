import user from "@/app/models/user";
import { connectDB } from "@/app/lib/connectDB";

export async function GET(request){
try{
    await connectDB();
   
    
    const users = await user.find({},"-password");
    if(!users){
        return Response.json({message: 'No users found'}, {status: 404});
    }
   
    return Response.json({users}, {status: 200});
}
catch(error){
    return Response.json({error: 'Failed to fetch users'}, {status: 500});
}
}

