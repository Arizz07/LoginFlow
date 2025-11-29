import {connectDB} from '@/app/lib/connectDB';
import { NextResponse } from 'next/server';
import User from '@/app/models/user';

export async function DELETE(request, context){
   try{
       const {id} = await context.params;
    await connectDB();
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return NextResponse.json({message:'User not found'}, {status:404});
        }
        return NextResponse.json({message:'User removed successfully'}, {status:200});

    }catch(error){  
        console.error('Error removing user:', error);
        return NextResponse.json({message:'Internal Server Error'}, {status:500});

   }
    
}