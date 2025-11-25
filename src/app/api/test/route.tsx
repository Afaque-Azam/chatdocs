import { NextResponse } from "next/server"

export const GET = async()=>{
    try {
        return    NextResponse.json({
            success:true,
            message:"Welcome to the backend of the chatDoc ",
        })
    } catch (error) {
        return    NextResponse.json({
            success:false,
            message:"Error in uploading the file",
            error: error
        })
    }
} 