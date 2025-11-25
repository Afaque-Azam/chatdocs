import { NextResponse } from "next/server";
import {connectdb} from "@/db/connectdb"
import { currentUser } from '@clerk/nextjs/server'


export const POST = async(req:any)=>{
    try {
        const {filename} = await req.json();
        const User = await currentUser()
        console.log(`user details : ${User}`)
        if (!User) {
            return NextResponse.json({
              success: false,
              message: "User not authenticated",
            });
          }

        const dbcollection = await connectdb();
        console.log("Filename: ", filename);
        const chatnames = await dbcollection?.find({chat_name:filename,userid:User.id}).toArray();

        console.log("Chatnames: ", chatnames);
        
        if(chatnames?.length === 0){
            return NextResponse.json({
                success:true,
                message:"Yes this chat name is available",
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"Please choose another chat name",
            })
        }

    } catch (error) {
       return NextResponse.json({
            success:false,
            error:error
        })
    }
}