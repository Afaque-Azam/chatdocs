import { NextResponse } from "next/server";
import {Mongconnectdb} from "@/mongodb/dbconnect"
import {UserData} from "@/Model/userdata"
import { currentUser } from '@clerk/nextjs/server'

export const GET= async()=>{
    try {
        const User = await currentUser()
        await Mongconnectdb()
        const data = await UserData.find({userid:User?.id});
        return NextResponse.json({
            success:true,
            data:data
        })
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error
        })
    }
}