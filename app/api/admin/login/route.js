import {connectDB} from '@/app/lib/connectDB';
import Admin from '@/app/models/Admin';

export async function POST(request) {
    await connectDB();

    const { username, password } = await request.json();
    console.log(username,password);

    try{
       const AdminUser = await Admin.findOne({username:username,password:password});
       if(!AdminUser){
        return Response.json({message:"UnAuthorized User"},{status:401});
       }
       return Response.json({message:"Admin Login Successful",AdminUser},{status:200});
    }catch(err){
        console.log("Error in Admin Login Route");
        console.log(err);
        return Response.json({message:"Internal Server Error"},{status:500});
    }
    
}