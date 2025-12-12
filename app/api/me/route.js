import { NextResponse } from "next/server";
import {verifyToken} from "@/app/lib/auth";

export async function GET(request){
    try{
        const token = request.cookies.get("session")?.value;
        if(!token){
            return NextResponse.json({authenticated:false,user:null}, {status:401});
        }
        const decoded = verifyToken(token);
        if(!decoded){
            return NextResponse.json({authenticated:false,user:null}, {status:401});
        }
        return NextResponse.json({authenticated:true,user:{
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
        }
    },{status:200});


    }catch(err){
        console.error("Error in /api/me route:",err);
        return NextResponse.json({authenticated:false,user:null}, {status:500});
    }
}