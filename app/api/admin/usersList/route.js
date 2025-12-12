import user from "@/app/models/user";
import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";

export async function GET(request){
try{

    const token = request.cookies.get("session")?.value;

    if(!token){
        return NextResponse.json({
            message: "Unauthorized Access",
        }, {status: 401});
    }
    const decoded = verifyToken(token);
    if(!decoded){
        return NextResponse.json({
            message:"Invalid Token",
        }, {status:401});
    }

    if(decoded.role!=="admin"){
        return NextResponse.json({
            message:"Access Denied. Admins Only",
        }, {status:403});

    }
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

