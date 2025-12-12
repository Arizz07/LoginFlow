import {NextResponse} from 'next/server';

export async function POST(request){
    try{

    
    const response = NextResponse.json({success:true,message:"Logged out successfully"},{status:200});
    

response.cookies.set('session',"",{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:"lax",
    maxAge:0,   
    path:'/',
})

return response;

}catch(err){
        console.error("Error in Admin Logout Route:",err);
        return NextResponse.json({success:false,message:"Internal Server Error"},{status:500});
    }
}